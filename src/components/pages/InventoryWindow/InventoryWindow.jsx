import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';

const InventoryWindow = ({onClose}) => {
  return (
    // <Dialog
    //     fullScreen
    //     open={open}
    //     onClose={handleClose}
    //     TransitionComponent={Transition}
    //   >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={onClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
          </Toolbar>
        </AppBar>
      // </Dialog>
  );
};

export default InventoryWindow;