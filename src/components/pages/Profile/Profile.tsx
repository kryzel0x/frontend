import { useEffect, useMemo, useState } from "react";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import "react-phone-input-2/lib/style.css";
import countryList from "react-select-country-list";
import {
  EditIcon,
  LogoutIcon,
  ProfileIcon,
  ReferralIcon,
} from "../../../assets/icons/icons";
import profile from "../../../assets/images/profile-pic.png";
import Button from "../../common/Button/Button";
import Input from "../../common/form/Input/Input";
import LogoutModal from "../../common/modals/LogoutModal/LogoutModal";
import "./Profile.scss";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import useCopyClipboard, {
  useAppDispatch,
  useAppSelector,
} from "../../../utils/hooks";
import { AppDispatch, RootState } from "../../../redux/store";
import { UserDetails } from "../../../utils/utils";
import {
  callApiGetMethod,
  callApiPostMethod,
} from "../../../services/api.service";
import { APIURL } from "../../../utils/constants";
import Table from "../../common/Table/Table";
import { collapseAddress } from "../../../core/utils";
import { useKeylessAccounts } from "../../../core/useKeylessAccounts";
import { setUserDetails } from "../../../redux/slices/user.slice";
import Error from "../../common/form/Error/Error";
import Spinner from "../../common/Spinner/Spinner";
import { truncateToTwoDecimals } from "../../../services/common.service";
import Poweredby from "../Homepage/PoweredBy/PoweredBy";

const Profile = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const { activeAccount } = useKeylessAccounts();
  const userDetails = useAppSelector(
    (state: RootState) => state.user.userDetails
  ) as UserDetails;
  const krzBalance = useAppSelector(
    (state: RootState) => state.user.krzBalance
  );
  const aptBalance = useAppSelector(
    (state: RootState) => state.user.aptBalance
  );
  const [file] = useState(profile);
  const options = useMemo(() => countryList().getData(), []);
  const [show, setShow] = useState(false);
  const [referralData, setReferralData] = useState([]);
  const [initialValues, setInitialValues] = useState({
    twitter: "",
    telegram: "",
    // age: "",
    // phoneNumber: "",
    // country: "",
    // sex: "",
    name: "",
  });

  const [set_Copied] = useCopyClipboard();
  const copy = (data: string) => {
    set_Copied(data);
    toast.success("Address copied", { id: "address" });
  };

  // const sexOption = [
  //     { value: "male", label: "Male" },
  //     { value: "female", label: "Female" },
  // ];

  useEffect(() => {
    // Update initialValues when userDetails changes
    setInitialValues(userDetails);
  }, [userDetails]);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true, // This ensures that the form is reset when initialValues change
    validationSchema: Yup.object({
      twitter: Yup.string()
        .matches(
          /^@?(\w){1,15}$/,
          "Invalid Twitter username. It must start with an optional '@' and be 1-15 characters long, containing only letters, numbers, or underscores."
        )
        .required("Twitter handle is required"),
      telegram: Yup.string()
        .matches(
          /^[a-zA-Z0-9_]{5,32}$/,
          "Invalid Telegram username. It must be 5-32 characters long, containing only letters, numbers, or underscores."
        )
        .required("Telegram handle is required"),
      // age: Yup.number().required("Age is required").positive().integer(),
      // phoneNumber: Yup.string().required("Phone number is required"),
      // country: Yup.string().required("Country is required"),
      // sex: Yup.string().required("Sex is required"),
    }),
    onSubmit: async (values) => {
      // Create an object with only the changed fields
      const changedValues = Object.keys(values).reduce((acc, key) => {
        if (values[key] !== formik.initialValues[key]) {
          acc[key] = values[key];
        }
        return acc;
      }, {});

      if (Object.keys(changedValues).length > 0) {
        // If there are changes, append '+' to phoneNumber before sending
        // if (changedValues.phoneNumber) {
        //     changedValues.phoneNumber = "+" + changedValues.phoneNumber;
        // }
        const res: any = await dispatch(
          callApiPostMethod(APIURL.PROFILE, changedValues)
        );
        if (!res.error) {
          dispatch(setUserDetails(res?.result?.userDetails));
        }
      } else {
        toast.error("No changes detected.", { id: "no_changes" });
      }
    },
  });

  const formikReferral = useFormik({
    initialValues: {
      emails: [""],
    },
    validationSchema: Yup.object({
      emails: Yup.array()
        .of(
          Yup.string()
            .email("Invalid email address")
            .required("Email is required")
        )
        .test("unique", "Duplicate email found", (emails: any) => {
          return new Set(emails).size === emails.length;
        })
        .max(3, "Maximum 3 emails allowed"),
    }),
    onSubmit: async (values) => {
      const isFormChanged = Object.keys(values).some(
        (key) => values[key] !== userDetails[key]
      );

      if (!isFormChanged) {
        // Show a toast message if no changes are detected
        toast.error("No changes detected");
        return;
      }
      await dispatch(callApiPostMethod(APIURL.INVITE, values));
      handleGetReferral();
      formikReferral.resetForm()
    },
  });

  useEffect(() => {
    handleGetReferral();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetReferral = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = await dispatch(
      callApiGetMethod(APIURL.INVITE, {}, false, false)
    );
    if (!res?.error) {
      setReferralData(res.result);
    }
  };

  const fields = [
    { name: "Email" },
    { name: "Referred at" },
    { name: "Accepted" },
  ];

  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const cleanImageUrl = userDetails?.profileImage?.split("=")[0];
    setImageSrc(cleanImageUrl || file);
  }, [userDetails?.profileImage, file]);

  const handleImageError = () => {
    setImageSrc(userDetails?.profileImage?.split("=")[0]);
  };

  return (
    <>
      <section className="profile_sec">
        <Container>
          <Tab.Container defaultActiveKey="profile">
            <Nav>
              <Nav.Link eventKey="profile">
                <ProfileIcon />
              </Nav.Link>
              <Nav.Link eventKey="referral">
                <ReferralIcon />{" "}
              </Nav.Link>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="profile">
                <div className="profile_box">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="profile_pic">
                      <div className="profile_pic_photo">
                        <img
                          src={imageSrc}
                          alt="profile"
                          referrerPolicy="no-referrer"
                          onError={handleImageError}
                        />
                        <label>
                          Upload Photo
                          <input type="file" />
                        </label>
                      </div>
                      <div>
                        <h1>{userDetails?.name}</h1>
                        <ul className="details_list">
                          <li className="wallet_address">
                            {/* <h3>Wallet Address:</h3> */}
                            {activeAccount ? (
                              <p>
                                {collapseAddress(
                                  activeAccount?.accountAddress.toString()
                                )}
                              </p>
                            ) : (
                              <Spinner />
                            )}
                            {activeAccount && (
                              <button
                                onClick={() =>
                                  copy(activeAccount?.accountAddress.toString())
                                }
                                type="button"
                              >
                                <EditIcon />
                              </button>
                            )}
                          </li>
                          <li className="wallet_balance mt-2">
                            <h3>
                              Wallet Balance:{" "}
                              {truncateToTwoDecimals(aptBalance)} APT |{" "}
                              {truncateToTwoDecimals(krzBalance)} KRZ
                            </h3>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* <h2>Add Profile Details</h2> */}
                    <div className="inputs">
                      <Row>
                        <Col md={12}>
                          <Input
                            label="Username"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && formik.errors.name}
                            placeholder="Display Name"
                          />
                        </Col>
                        <Col md={6}>
                          <Input
                            label="Twitter Username"
                            placeholder="X (Twitter) "
                            name="twitter"
                            value={formik.values.twitter}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched.twitter && formik.errors.twitter
                            }
                          />
                        </Col>
                        <Col md={6}>
                          <Input
                            label="Telegram Username"
                            placeholder="Telegram"
                            name="telegram"
                            value={formik.values.telegram}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched.telegram && formik.errors.telegram
                            }
                          />
                        </Col>
                      </Row>
                      {/* <Input
                                label="Age:"
                                name="age"
                                type="number"
                                value={formik.values.age}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.age && formik.errors.age}
                                className="margin_input"
                            />
                            <div className="custom_phone margin_input">
                                <Label>Mobile Number:</Label>
                                <PhoneInput
                                    country={"us"}
                                    value={formik.values.phoneNumber}
                                    onChange={(value) =>
                                        formik.setFieldValue("phoneNumber", value)
                                    }
                                />
                                {formik.errors.phoneNumber && (
                                    <Error>{formik.errors.phoneNumber}</Error>
                                )}
                            </div>
                            <div className="custom_select margin_input">
                                <Label>Country:</Label>
                                <ReactSelect
                                    classNamePrefix="select"
                                    options={options}
                                    value={options.find(
                                        (opt) => opt.value === formik.values.country
                                    )}
                                    onChange={(option: any) =>
                                        formik.setFieldValue("country", option.value)
                                    }
                                />
                                {formik.errors.country && (
                                    <Error>{formik.errors.country}</Error>
                                )}
                            </div>
                            <div className="custom_select margin_input">
                                <Label>Sex:</Label>
                                <ReactSelect
                                    classNamePrefix="select"
                                    options={sexOption}
                                    value={sexOption.find(
                                        (opt) => opt.value === formik.values.sex
                                    )}
                                    onChange={(option: any) =>
                                        formik.setFieldValue("sex", option.value)
                                    }
                                />
                                {formik.errors.sex && <Error>{formik.errors.sex}</Error>}
                            </div> */}
                      <Button className="dark_btn submit_btn" type="submit">
                        <span>Update Info</span>
                      </Button>
                    </div>
                  </form>
                  <button
                    type="button"
                    onClick={() => setShow(true)}
                    className="logout_btn"
                  >
                    Log Out <LogoutIcon />
                  </button>
                  <LogoutModal show={show} handleClose={() => setShow(false)} />
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="referral">
                <div className="profile_box referral_box">
                  <form onSubmit={formikReferral.handleSubmit}>
                    <h2>Add Referral Email Id</h2>
                    <div className="inputs">
                      {formikReferral.values.emails.map((email, index) => (
                        <div key={index}>
                          <Input
                            // label={`Referral:`}
                            placeholder="Referral"
                            name={`emails[${index}]`}
                            value={email}
                            onChange={formikReferral.handleChange}
                            onBlur={formikReferral.handleBlur}
                            error={
                              (formikReferral.errors as any).length
                                ? formikReferral.errors.emails?.[index]
                                : formikReferral.errors.emails
                            }
                          />
                        </div>
                      ))}

                      <Button className="dark_btn submit_btn" type="submit">
                        Submit
                      </Button>
                    </div>
                  </form>
                  <Table title="Referred Emails" fields={fields}>
                    {referralData.length > 0 &&
                      referralData.map((item: any, index) => {
                        const isoDate = "2024-12-14T14:12:27.539Z";

                        // Create a Date object
                        new Date(isoDate);
                        return (
                          <tr key={index}>
                            <td>
                              <span>{item?.email}</span>
                            </td>
                            <td>
                              <span>
                                {new Date(item?.createdAt).toDateString()}
                              </span>
                            </td>
                            <td>{item.isAccepted ? "Accepted" : "Not Yet"}</td>
                          </tr>
                        );
                      })}
                  </Table>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Container>
      </section>
      <Poweredby />
    </>
  );
};

export default Profile;
