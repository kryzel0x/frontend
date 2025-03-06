import toast from "react-hot-toast";
import { EditIcon } from "../../../assets/icons/icons";
import useCopyClipboard from "../../../utils/hooks";
import './ReferralShare.scss';
import Input from "../../common/form/Input/Input";
interface ReferralShareProps {
    referralCode: string;
    userName?: string; // Making userName optional with the ? modifier
}

const ReferralShare = ({ referralCode, userName }: ReferralShareProps) => {
    // Generate the full referral URL
    const referralUrl = `${window.location.origin
        }/?referralCode=${encodeURIComponent(referralCode)}`;

    // Handle copy to clipboard
    const [set_Copied] = useCopyClipboard();
    const copy = (data: string) => {
        set_Copied(data);
        toast.success("Address copied", { id: "address" });
    };

    return (
        <div className="referral_share">
            <div className="referral_card">
                <h2>Share your referral link</h2>
                {userName && (
                    <p className="referral_intro">
                        Hey {userName}, Invite your friends to join Kryzel Testnet and earn rewards!
                    </p>
                )}

                <div className="referral-link-container mt-3">
                    <div className="referral_link">
                        <Input
                            label={"Your unique referral link:"}
                            value={referralUrl}
                            readOnly
                            className="referrel_input"
                            rightIcon={
                                <button onClick={() => copy(referralUrl)} className="copy_btn" type="button">
                                    <EditIcon />
                                </button>}
                        />
                        {/* <input
                            type="text"
                            value={referralUrl}
                            readOnly
                            className="referral-url"
                        /> */}

                    </div>
                </div>

                <div className="referral-benefits">
                    <h3>Benefits</h3>
                    <ul>
                        <li>
                            Earn 300 KRZ tokens for you and your friend when they sign up.
                        </li>
                        <li>No referral limit – invite as many friends as you want!</li>
                        <li>More referrals = More rewards!</li>
                    </ul>
                    <p className="mt-3">Start sharing and maximize your rewards!</p>
                </div>
            </div>

            {/* <Toast
                show={showCopyToast}
                onClose={() => setShowCopyToast(false)}
                className="copy-toast"
                delay={3000}
                autohide
            >
                <Toast.Body>Referral link copied to clipboard!</Toast.Body>
            </Toast> */}
        </div>
    );
};

export default ReferralShare;
