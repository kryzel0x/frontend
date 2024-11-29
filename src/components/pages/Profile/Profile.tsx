import { useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import ReactSelect from "react-select";
import countryList from 'react-select-country-list';
import coin from "../../../assets/icons/coin.png";
import edit from "../../../assets/icons/edit-icon.svg";
import { EditIcon, LogoutIcon } from "../../../assets/icons/icons";
import profile from "../../../assets/images/profile-pic.png";
import Button from "../../common/Button/Button";
import Input from "../../common/form/Input/Input";
import Label from "../../common/form/Label/Label";
import LogoutModal from "../../common/modals/LogoutModal/LogoutModal";
import "./Profile.scss";
import toast from "react-hot-toast";

const Profile = () => {
    const [file, setFile] = useState(profile);
    const options = useMemo(() => countryList().getData(), [])
    const [show, setShow] = useState(false);
    return (
        <section className="profile_sec">
            <Container>
                <div className="profile_box">
                    <button type="button" onClick={() => setShow(true)} className="logout_btn"><LogoutIcon /></button>
                    <LogoutModal show={show} handleClose={() => setShow(false)} />
                    <form>
                        <div className="profile_pic">
                            <img src={file} alt="profile" />
                            <label>
                                <img src={edit} alt="edit" />
                                <input type="file" onChange={e => {
                                    if (e.target.files) {
                                        setFile(URL.createObjectURL(e.target.files[0]));
                                    }
                                }} />
                                Change Profile Picture
                            </label>
                        </div>
                        <h1>Shikher Saxena</h1>
                        <ul className="details_list">
                            <li className="wallet_address">
                                <h3>Wallet Address:</h3>
                                <p>0sasasas2232bjjsnsnwdsn2u323n232n3nddsdndssd78766sdsnds <button onClick={() => toast.success("Copied", {
                                    duration: 100000,
                                })} type="button"><EditIcon /></button></p>
                            </li>
                            <li className="wallet_balance">
                                <h3>Wallet Balance:</h3>
                                <p><img src={coin} alt="coin" /> 1199.00</p>
                            </li>
                        </ul>
                        <h2>Add Profile Details</h2>
                        <div className="inputs">
                            <Input
                                label="Twitter:"
                                name='twitter'
                                className="margin_input"
                            />
                            <Input
                                label="Telegram:"
                                name='telegram'
                                className="margin_input"
                            />
                            <Input
                                label="Age:"
                                name='age'
                                type="number"
                                inputMode="numeric"
                                pattern="\d*"
                                className="margin_input"
                            />
                            <div className="custom_phone margin_input">
                                <Label>Mobile Number:</Label>
                                <PhoneInput
                                    country={'us'}
                                />
                            </div>
                            <div className="custom_select margin_input">
                                <Label>Country:</Label>
                                <ReactSelect
                                    classNamePrefix="select"
                                    options={options}
                                    placeholder=""
                                />
                            </div>
                            <div className="custom_select margin_input">
                                <Label>Sex:</Label>
                                <ReactSelect
                                    classNamePrefix="select"
                                    options={[{ value: "male", label: "Male" }, { value: "female", label: "Female" }]}
                                    placeholder=""
                                    defaultValue={{ value: "male", label: "Male" }}
                                />
                            </div>
                            <Button className="submit_btn" type="submit">Update</Button>
                        </div>
                    </form>
                </div>
            </Container>
        </section>
    )
}

export default Profile
