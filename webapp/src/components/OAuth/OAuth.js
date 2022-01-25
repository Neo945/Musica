import { Link, List, ListItem } from "@mui/material";
import { useState } from "react";
function OAuth(props) {
  // eslint-disable-next-line no-unused-vars
  const [linkList, _] = useState([
    {
      provider: "Google",
      link: "/",
      logo: "/",
    },
  ]);
  return (
    <List>
      {linkList.map((e, i) => (
        <ListItem key={i}>
          <Link href={e.link}>{e.provider}</Link>
        </ListItem>
      ))}
    </List>
  );
}

export default OAuth;
