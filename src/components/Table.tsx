import React, { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Props } from "../components/sideBarComponents/props/Table";
import { style } from "../styles/table";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import axios from "../config/axios";
// import { PatientDetailsContext } from "../../context/PatientDetailsContext";

const TableComponent = (props: Props) => {
  const deleteTretmentSkus = (id: number) => {
    axios.delete("treatment_skus/" + id).then((res) => {
      console.log(res.data);
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
          {props.bodyCell.map((e, i) => {
            return (
              <>
                <TableRow
                // key={row.name
                >
                  <TableCell component='th' scope='row' style={style.tableData}>
                    {e.item}
                  </TableCell>
                  <TableCell align='right' style={style.tableData}>
                    {e.quantity} X
                  </TableCell>
                  <TableCell align='center' style={style.tableData}>
                    {e.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </TableCell>
                  <TableCell align='right' style={style.tableData}>
                    <div style={style.iconContain}>
                      <DeleteOutlinedIcon
                        style={style.deleteIcon}
                        onClick={() =>
                          props.deleteTretmentSkus &&
                          props.deleteTretmentSkus(e.id, e.item)
                        }
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
