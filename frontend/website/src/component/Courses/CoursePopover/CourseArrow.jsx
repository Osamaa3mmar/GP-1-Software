import { styled } from '@mui/material/styles';

/**
 * A styled arrow component used for popover pointers
 * @param {Object} theme - Material-UI theme object
 * @param {string} direction - Arrow direction ('left' or 'right')
 */

const CourseArrow = styled('div')(({ theme, direction }) => ({
  position: 'absolute',
  width: 0,
  height: 0,
  borderStyle: 'solid',
  borderWidth: '8px 8px 8px 0',
  // borderColor: `transparent ${theme.palette.background.paper} transparent transparent`,
  borderColor: `transparent ${theme.palette.primary.main} transparent transparent`,
  left: direction === 'left' ? '-8px' : 'auto',
  right: direction === 'right' ? '-8px' : 'auto',
  top: '50%',
  transform: 'translateY(-50%)',
}));

export default CourseArrow;