import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Props } from "../props/table";
import { style } from "../styles/table";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import axios from "../config/axios";

const TableComponent = (props: Props) => {
  const deleteTretmentSkus = (id: number) => {
    axios
      .delete("treatment_skus/" + id)
      .then((res) => {
        alert("Item deleted successfully");
      })
      .catch((err) => {
        alert("Error deleting item: " + err.message);
      });
  };
  return (
    <TableContainer>
      <Table style={props.style} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell style={style.tableHead}>{props.headCell[0]}</TableCell>
            <TableCell style={style.tableHead} align='right'>
              {props.headCell[1]}
            </TableCell>
            <TableCell style={style.tableHead} align='right'>
              {props.headCell[2]}
            </TableCell>
            <TableCell style={style.tableHead} align='right'>
              {props.headCell[3]}
            </TableCell>
            {/* {props.headCell.map((item)=>{
                return <TableCell>{item}</TableCell>
              })} */}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.bodyCell.map((e) => {
            return (
              <>
                <TableRow
                // key={row.name
                //  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component='th' scope='row' style={style.tableData}>
                    {e.item}
                  </TableCell>
                  <TableCell align='right' style={style.tableData}>
                    {e.quantity}
                  </TableCell>
                  <TableCell align='center' style={style.tableData}>
                    {e.price}
                  </TableCell>
                  <TableCell align='right' style={style.tableData}>
                    <div style={style.iconContain}>
                      <DeleteOutlinedIcon
                        style={style.deleteIcon}
                        onClick={() => deleteTretmentSkus(e.id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              </>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
