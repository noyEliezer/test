import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { List, ListItemIcon } from "@mui/material";

export default function renderRow(props) {
  return (
    <div>
      <List>
        {props.listPlace.map((item) => {
          return (
            <ListItem
              onClick={() => {
                props.setSelectedPosition(item);
                props.setLocationName(item?.display_name);
              }}
              key={item.place_id}
              component="div"
              disablePadding
              style={{ width: "45vw" }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <img
                    src={`${window.location.origin}/placeholder.png`}
                    alt="Placeholder"
                    style={{ width: 38, height: 38 }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={item?.display_name}
                  primaryTypographyProps={{ fontSize: "15px" }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
