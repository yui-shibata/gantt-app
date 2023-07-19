import React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';

const ListItems = () => {
  return (
    <React.Fragment>
      <ListItemButton to={`/`}>
        <ListItemIcon>
          <FileUploadIcon />
        </ListItemIcon>
        <ListItemText primary="CSVインポート" />
      </ListItemButton>
      <ListItemButton to={`/`}>
        <ListItemIcon>
          <AccountTreeIcon />
        </ListItemIcon>
        <ListItemText primary="処理状況一覧画面" />
      </ListItemButton>
      <ListItemButton to={`/`}>
        <ListItemIcon>
          <ViewTimelineIcon />
        </ListItemIcon>
        <ListItemText primary="ガントチャート" />
      </ListItemButton>
      <ListItemButton to={`/calendar`}>
        <ListItemIcon>
          <ViewTimelineIcon />
        </ListItemIcon>
        <ListItemText primary="ガントチャート試作中" />
      </ListItemButton>
    </React.Fragment>
  );
}

export default ListItems;
