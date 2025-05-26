import React from 'react'
import { useParams } from 'react-router-dom';

export default function Lesson() {
    const {courseId}=useParams();
    console.log(courseId);
    return (
        <div>Lesson</div>
    )
}
