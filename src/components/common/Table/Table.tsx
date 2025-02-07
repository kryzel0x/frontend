import { ReactNode } from "react";
import ReactPaginate from "react-paginate";
import BootstrapTable from "react-bootstrap/Table";
import { LeftIcon, NoRecordIcon, RightIcon } from "../../../assets/icons/icons";
import { clsx } from "../../../utils/utils";
import "./Table.scss";
import Shimmer from "../Shimmer/Shimmer";

export type field = {
    name?: ReactNode;
};

type PropTypes = {
    title?: string;
    className?: string;
    fields?: field[];
    children?: ReactNode;
    loading?: boolean;
    pagination?: boolean;
    currentPage?: number;
    totalPages?: number;
    onPageChange?: (selectedItem: { selected: number }) => void;
};

const Table = ({
    children,
    loading = false,
    title,
    fields,
    className,
    pagination,
    currentPage = 0,
    totalPages = 1,
    onPageChange,
}: PropTypes) => {
    return (
        <div className={clsx("custom_table", className)}>
            {title && <h2>{title}</h2>}
            <BootstrapTable responsive>
                {fields && (
                    <thead>
                        <tr>
                            {fields.map((item, index) => (
                                <th key={`${item.name}` + index}>{item.name}</th>
                            ))}
                        </tr>
                    </thead>
                )}
                <tbody>
                    {loading
                        ? Array.from({ length: 5 }).map((_, index) => (
                              <tr className="shimmer_effect" key={index}>
                                  {Array.from({ length: 1 }).map((_, index) => (
                                      <td key={index} colSpan={fields?.length}>
                                          <Shimmer />
                                      </td>
                                  ))}
                              </tr>
                          ))
                        : children || (
                              <tr>
                                  <td colSpan={fields?.length}>
                                      <div className="no_record_found">
                                          <NoRecordIcon />
                                          <p>No Record Found</p>
                                      </div>
                                  </td>
                              </tr>
                          )}
                </tbody>
                {pagination && totalPages > 1 && (
                    <tfoot>
                        <tr>
                            <td colSpan={fields?.length}>
                                <ReactPaginate
                                    breakLabel="..."
                                    nextLabel={<RightIcon />}
                                    onPageChange={onPageChange}
                                    pageRangeDisplayed={5}
                                    pageCount={totalPages}
                                    forcePage={currentPage}
                                    previousLabel={<LeftIcon />}
                                    renderOnZeroPageCount={null}
                                    containerClassName="pagination"
                                    activeClassName="active"
                                />
                            </td>
                        </tr>
                    </tfoot>
                )}
            </BootstrapTable>
        </div>
    );
};

export default Table;
