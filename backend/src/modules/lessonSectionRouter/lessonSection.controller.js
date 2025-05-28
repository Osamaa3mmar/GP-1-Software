import { lessonModel } from "../../../DB/models/Lessons/Lesson.js";
import { lessonSectionModel } from "../../../DB/models/Section/Section.modal.js";
import { courseModel } from "../../../DB/models/CourseModel/course.model.js";
import { quizModel } from "../../../DB/models/quizes/Quiz.js";
import { makeNotification } from "../Notification/Notification.controller.js";
import cloudinary from "../../utils/Claoudinary.js";

// Get all sections for a specific lesson
export const getAllSections = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const { user } = req.body;
    
    // Find the lesson
    const lesson = await lessonModel.findByPk(lessonId, {
      include: [
        {
          model: lessonSectionModel,
          as: "sections",
          order: [['order', 'ASC']]
        },
        {
          model: courseModel,
          as: "course"
        }
      ]
    });
    
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    
    // Check if user has edit permissions (teacher of the course or organization admin)
    let allowEdit = false;
    if (lesson.course.teacherId === user.id || user.orgId === lesson.course.orgId) {
      allowEdit = true;
    }
    
    return res.status(200).json({
      message: "success",
      lesson: {
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        courseId: lesson.courseId
      },
      sections: lesson.sections || [],
      control: allowEdit
    });
  } catch (error) {
    console.error("Error getting lesson sections:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Add a new section to a lesson
export const addSection = async (req, res) => {
  try {
    const { lessonId, title, type, content, mediaUrl, order, quizId } = req.body;
    const { user } = req.body;
    
    // Find the lesson
    const lesson = await lessonModel.findByPk(lessonId, {
      include: [
        {
          model: courseModel,
          as: "course"
        }
      ]
    });
    
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    
    // Check if user has permission to add sections to this lesson
    if (lesson.course.teacherId !== user.id && user.orgId !== lesson.course.orgId) {
      return res.status(403).json({ message: "You don't have permission to add sections to this lesson" });
    }
    
    // Handle image upload if present
    let secureMediaUrl = mediaUrl;
    if (req.files && req.files.sectionImage) {
      try {
        const uploadResult = await cloudinary.uploader.upload(req.files.sectionImage[0].path);
        secureMediaUrl = uploadResult.secure_url;
      } catch (uploadError) {
        console.error("Error uploading image to Cloudinary:", uploadError);
        return res.status(500).json({ message: "Error uploading image", error: uploadError.message });
      }
    }
    
    // If the section type is quiz and no quizId is provided, create a new empty quiz
    let sectionQuizId = quizId;
    
    if (type === 'quiz' && !quizId) {
      try {
        // Create a new empty quiz
        const newQuiz = await quizModel.create({
          title: `${title} Quiz`,
          description: `Quiz for ${title}`,
          courseId: lesson.courseId,
          lessonId,
          sectionId: null, // Will be updated after section creation
          difficulty: 'medium',
          totalMarks: 0,
          passMarks: 0
        });
        
        sectionQuizId = newQuiz.id;
        
        // Notify the teacher/owner that a new quiz has been created
        await makeNotification({
          userId: user.id,
          title: 'New Quiz Created',
          message: `An empty quiz has been created for section "${title}". You can now add questions to it.`,
          type: 'info'
        });
        
      } catch (quizError) {
        console.error("Error creating empty quiz:", quizError);
        // Continue with section creation even if quiz creation fails
      }
    }
    
    // Create the new section
    const newSection = await lessonSectionModel.create({
      lessonId,
      title,
      type,
      content: content || null,
      mediaUrl: secureMediaUrl || null,
      order: order || 0,
      quizId: sectionQuizId || null
    });
    
    // If we created a new quiz, update it with the section ID
    if (type === 'quiz' && sectionQuizId && !quizId) {
      await quizModel.update(
        { sectionId: newSection.id },
        { where: { id: sectionQuizId } }
      );
    }
    
    // Create notification for the academy (organization) when a section is added
    if (lesson.course.orgId) {
      const message = `A new section "${title}" was added to lesson "${lesson.title}" in course "${lesson.course.title}"`;
      const actionUrl = `/main/classrooms/${lesson.courseId}/lessons/lesson/${lessonId}`;
      await makeNotification("add", "add", message, actionUrl, lesson.course.orgId, false, null);
    }
    
    return res.status(201).json({ message: "Section added successfully", section: newSection });
  } catch (error) {
    console.error("Error adding section:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update an existing section
export const updateSection = async (req, res) => {
  try {
    const { id, title, type, content, mediaUrl } = req.body;
    const { user } = req.body;
    
    // Find the section with its associated lesson and course
    const section = await lessonSectionModel.findByPk(id, {
      include: [
        {
          model: lessonModel,
          as: "lesson",
          include: [
            {
              model: courseModel,
              as: "course"
            }
          ]
        }
      ]
    });
    
    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }
    
    // Check if user has permission to update this section
    if (section.lesson.course.teacherId !== user.id && user.orgId !== section.lesson.course.orgId) {
      return res.status(403).json({ message: "You don't have permission to update this section" });
    }
    
    // Handle image upload if present
    let secureMediaUrl = mediaUrl;
    if (req.files && req.files.sectionImage) {
      try {
        const uploadResult = await cloudinary.uploader.upload(req.files.sectionImage[0].path);
        secureMediaUrl = uploadResult.secure_url;
      } catch (uploadError) {
        console.error("Error uploading image to Cloudinary:", uploadError);
        return res.status(500).json({ message: "Error uploading image", error: uploadError.message });
      }
    }
    
    // Update the section
    section.title = title || section.title;
    section.type = type || section.type;
    
    // Update content based on type
    if (type === "text" || type === "code") {
      section.content = content !== undefined ? content : section.content;
      section.mediaUrl = null; // Clear media URL if type changed to text/code
    } else if (type === "video" || type === "image") {
      section.mediaUrl = secureMediaUrl !== undefined ? secureMediaUrl : section.mediaUrl;
      section.content = null; // Clear content if type changed to video/image
    }
    
    await section.save();
    
    // Create notification for the academy (organization) when a section is updated
    if (section.lesson.course.orgId) {
      const message = `Section "${section.title}" in lesson "${section.lesson.title}" was updated`;
      const actionUrl = `/main/classrooms/${section.lesson.courseId}/lessons/lesson/${section.lesson.id}`;
      await makeNotification("update", "update", message, actionUrl, section.lesson.course.orgId, false, null);
    }
    
    return res.status(200).json({ message: "Section updated successfully", section });
  } catch (error) {
    console.error("Error updating section:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a section
export const deleteSection = async (req, res) => {
  try {
    const { id } = req.body;
    const { user } = req.body;
    
    // Find the section
    const section = await lessonSectionModel.findByPk(id);
    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }
    
    // Find the lesson to check permissions
    const lesson = await lessonModel.findByPk(section.lessonId, {
      include: [
        {
          model: courseModel,
          as: "course"
        }
      ]
    });
    
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    
    // Check if user has permission to delete this section
    if (lesson.course.teacherId !== user.id && user.orgId !== lesson.course.orgId) {
      return res.status(403).json({ message: "You don't have permission to delete this section" });
    }
    
    // Store section info before deletion for notification
    const sectionTitle = section.title;
    
    // Delete the section
    await section.destroy();
    
    // Create notification for the academy (organization) when a section is deleted
    if (lesson.course.orgId) {
      const message = `Section "${sectionTitle}" was deleted from lesson "${lesson.title}"`;
      const actionUrl = `/main/classrooms/${lesson.courseId}/lessons/lesson/${lesson.id}`;
      await makeNotification("delete", "delete", message, actionUrl, lesson.course.orgId, false, null);
    }
    
    return res.status(200).json({ message: "Section deleted successfully" });
  } catch (error) {
    console.error("Error deleting section:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Reorder sections
export const reorderSections = async (req, res) => {
  try {
    const { lessonId, sectionIds } = req.body;
    const { user } = req.body;
    
    // Find the lesson to check permissions
    const lesson = await lessonModel.findByPk(lessonId, {
      include: [
        {
          model: courseModel,
          as: "course"
        }
      ]
    });
    
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    
    // Check if user has permission to reorder sections
    if (lesson.course.teacherId !== user.id && user.orgId !== lesson.course.orgId) {
      return res.status(403).json({ message: "You don't have permission to reorder sections in this lesson" });
    }
    
    // Update the order of each section
    for (let i = 0; i < sectionIds.length; i++) {
      const sectionId = sectionIds[i];
      const section = await lessonSectionModel.findByPk(sectionId);
      
      if (section && section.lessonId.toString() === lessonId.toString()) {
        await section.update({ order: i + 1 });
      }
    }
    
    return res.status(200).json({ message: "Sections reordered successfully" });
  } catch (error) {
    console.error("Error reordering sections:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
