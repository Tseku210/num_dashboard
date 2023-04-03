import { forwardRef, Children } from "react";
import { FixedSizeList as List } from "react-window";
import Box from "@mui/material/Box";

const ListboxComponent = forwardRef(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData = Children.toArray(children);
  const itemCount = itemData.length;

  return (
    <Box ref={ref} {...other}>
      <List
        height={150}
        width="100%"
        itemSize={46}
        itemCount={itemCount}
        itemData={itemData}
        {...other}>
        {({ index, style }) => <Box style={style}>{itemData[index]}</Box>}
      </List>
    </Box>
  );
});

export default ListboxComponent;
