import { ReactNode } from "react";
import BootstrapTable from "react-bootstrap/Table";
import { NoRecordIcon } from "../../../assets/icons/icons";
import { clsx } from "../../../utils/utils";
import "./Table.scss";

export type field = {
    name?: ReactNode,
}

type PropTypes = {
    title?: string,
    className?: string,
    fields?: field[],
    children?: ReactNode,
}

const Table = ({ children, title, fields, className }: PropTypes) => {
    return (
        <div className={clsx("custom_table", className)}>
            {title && <h2>{title}</h2>}
            <BootstrapTable
                responsive
            >
                {
                    fields &&
                    <thead>
                        {
                            fields.map((item, index) => {
                                return (
                                    <th key={`${item.name}` + index}>{item.name}</th>
                                )
                            })
                        }
                    </thead>
                }
                <tbody>
                    {
                        children ||
                        <tr>
                            <td colSpan={fields?.length}>
                                <div className="no_record_found">
                                    <NoRecordIcon />
                                    <p>No Record Found</p>
                                </div>
                            </td>
                        </tr>
                    }
                </tbody>
            </BootstrapTable>
        </div>
    )
}

export default Table