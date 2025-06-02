              {newSectionType === 'video' && (
                <TextField
                  margin="dense"
                  label="Video URL"
                  type="text"
                  fullWidth
                  value={newSectionMediaUrl}
                  onChange={(e) => setNewSectionMediaUrl(e.target.value)}
                  helperText="Enter YouTube embed URL"
                />
              )}
              
              {newSectionType === 'image' && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Choose an option to add an image:
                  </Typography>
                  
                  {/* Image URL input */}
                  <TextField
                    margin="dense"
                    label="Image URL"
                    type="text"
                    fullWidth
                    value={newSectionMediaUrl}
                    onChange={(e) => {
                      setNewSectionMediaUrl(e.target.value);
                      setNewSectionImage(null);
                      setPreviewImage(null);
                    }}
                    helperText="Enter image URL or upload an image below"
                    sx={{ mb: 2 }}
                  />
                  
                  <Typography variant="subtitle2" gutterBottom>
                    OR
                  </Typography>
                  
                  {/* Image upload */}
                  <Box sx={{ mt: 2, mb: 2 }}>
                    <input
                      accept="image/*"
                      id="section-image-upload"
                      type="file"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setNewSectionImage(file);
                          setPreviewImage(URL.createObjectURL(file));
                          setNewSectionMediaUrl(''); // Clear URL if file is selected
                        }
                      }}
                    />
                    <label htmlFor="section-image-upload">
                      <Button
                        variant="contained"
                        component="span"
                        startIcon={<ImageIcon />}
                      >
                        Upload Image
                      </Button>
                    </label>
                  </Box>
                  
                  {/* Preview image */}
                  {previewImage && (
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                      <img 
                        src={previewImage} 
                        alt="Preview" 
                        style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }} 
                      />
                    </Box>
                  )}
                </Box>
              )}
