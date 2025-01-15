import { Container } from "react-bootstrap";
import silver from "../../../../assets/icons/silver-crown.svg";
import golden from "../../../../assets/icons/golden-crown.svg";
import { clsx } from "../../../../utils/utils";
import Table from "../../../common/Table/Table";
import "./Standings.scss";
import { collapseAddress } from "../../../../core/utils";
import useCopyClipboard, { useAppSelector } from "../../../../utils/hooks";
import toast from "react-hot-toast";
import { EditIcon } from "../../../../assets/icons/icons";
import { RootState } from "../../../../redux/store";

const Standings = ({
  title = "Leaderboard",
  className,
  bottomSpacing = false,
  isStanding = false,
  leaderboardData = [],
  rankUser = [],
}: {
  title?: string;
  className?: string;
  bottomSpacing?: boolean;
  isStanding?: boolean;
  leaderboardData?: any[];
  rankUser?: any[];
}) => {
  const krzDecimals = useAppSelector(
    (state: RootState) => state.user.krzDecimals || 1
  );

  const fields = [
    { name: "#" },
    { name: "User" },
    { name: "Wallet Address" },
    { name: "Overall Score" },
  ];

  const [set_Copied] = useCopyClipboard();
  const copy = (data: string) => {
    set_Copied(data);
    toast.success("Address copied", { id: "address" });
  };

  return (
    <section
      className={clsx(
        "standings_sec",
        className,
        bottomSpacing && "bottom_spacing"
      )}
    >
      <Container>
        <Table
          title={title}
          fields={fields}
          loading={!leaderboardData.length}
        >
          {isStanding &&
            rankUser?.length > 0 &&
            rankUser.map((item, index) => {
              const isGolden = index === 0;
              return (
                <tr
                  key={item.walletAddress + index}
                  className={clsx(
                    isGolden ? "golden" : "silver",
                    index === 0 && "active"
                  )}
                >
                  <td>{item?.rank || "N/A"}</td>
                  <td>{item?.name || "N/A"}</td>
                  <td className="d-flex align-items-center">
                    {collapseAddress(item.walletAddress || "")}
                    <button
                      onClick={() => copy(item.walletAddress || "")}
                      type="button"
                      className="copy-btn"
                    >
                      <EditIcon />
                    </button>
                  </td>
                  <td>
                    {(item?.creditScore ?? 0) / Math.pow(10, krzDecimals)}
                  </td>
                </tr>
              );
            })}
          {leaderboardData?.length > 0 &&
            leaderboardData.map((item, index) => {
              const isGolden = index < 3; // Top 3 users get golden crowns
              return (
                <tr
                  key={item.walletAddress + index}
                  className={clsx(
                    isGolden ? "golden" : "silver",
                    !isStanding && index === 0 && "active"
                  )}
                >
                  <td>
                    {index + 1}{" "}
                    <img
                      src={isGolden ? golden : silver}
                      className="crown_icon"
                      alt="crown"
                    />
                  </td>
                  <td>{item?.name || "N/A"}</td>
                  <td className="d-flex align-items-center">
                    {collapseAddress(item.walletAddress || "")}
                    <button
                      onClick={() => copy(item.walletAddress || "")}
                      type="button"
                      className="copy-btn"
                    >
                      <EditIcon />
                    </button>
                  </td>
                  <td>
                    {(item?.creditScore ?? 0) / Math.pow(10, krzDecimals)}
                  </td>
                </tr>
              );
            })}
        </Table>
      </Container>
    </section>
  );
};

export default Standings;
