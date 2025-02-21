import { useState } from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SectionDivider from "src/components/SectionDivider";
import { ToastContainer, toast } from 'react-toastify';
import api from "src/utils/api";

// ----------------------------------------------------------------------



function ApplyLeaveFrom({setIsformOpen}) {

    const [formData, setFormData] = useState({
    emergencyContact: { name: "", relation: "", contactNumber: "" },
    address: { street: "", city: "", state: "", postalCode: "" },
    firstName: "",
    lastName: "",
    contact: "",
    email: "",
    aadhar: "",
    pan: "",
    bankAccountNo: "",
    profilePicLink: ""
    });

    // Handle input change
    const handleChange = (event) => {
        const { name, value } = event.target;
        const keys = name.split(".");

        setFormData((prev) => {
            if (keys.length === 1) {
                return { ...prev, [name]: value };
            }
            return {
                ...prev,
                [keys[0]]: { ...prev[keys[0]], [keys[1]]: value },
            };
        });
    };

    const notify = (x) => toast(x);

    // Handle form submission
    const handleSubmit = async() => {
        const { data } = await api.post('/employees',formData)
        if (data.success) {
            notify("Form Submitted Successfully")
            setTimeout(() => {
            setIsformOpen(false)
            }, 1000);
        } else {
            notify("Form Submition Unsuccessfull!XXXXX")
        }
    };

    return (
        <>
            <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 1, mt: 2 }}>
                <Typography variant="h5">Add Employee Form</Typography>
            </Box>

            <Box display="flex" flexDirection="column" alignItems="flex-end" padding="10px">
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <SectionDivider title="Employee Info">
                            <Grid container spacing={1}>
                                {[
                                    { name: "leave_from", label: "Leave From", size: 6 },
                                    { name: "leave_upto", label: "Leave Upto", size: 6 },
                
                                ].map((field, index) => (
                                    <Grid item xs={field.size} key={index}>
                                        <TextField
                                            fullWidth
                                            name={field.name}
                                            label={field.label}
                                            value={formData[field.name] || ""}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: true }}
                                            sx={{ mb: 1 }}
                                            size="small"
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </SectionDivider>
                    </Grid>

                    <Grid item xs={12}>
                        <SectionDivider title="Address">
                            <Grid container spacing={1}>
                                {[
                                    { name: "address.street", label: "Street", size: 12 },
                                    { name: "address.city", label: "City", size: 4 },
                                    { name: "address.state", label: "State", size: 4 },
                                    { name: "address.postalCode", label: "Postal Code", size: 4 },
                                ].map((field, index) => (
                                    <Grid item xs={field.size} key={index}>
                                        <TextField
                                            fullWidth
                                            name={field.name}
                                            label={field.label}
                                            value={formData.address?.[field.name.split(".")[1]] || ""}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: true }}
                                            sx={{ mb: 1 }}
                                            size="small"
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </SectionDivider>
                    </Grid>

                    <Grid item xs={12}>
                        <SectionDivider title="Emergency Contact">
                            <Grid container spacing={1}>
                                {[
                                    { name: "emergencyContact.name", label: "Name", size: 4 },
                                    { name: "emergencyContact.relation", label: "Relation", size: 4 },
                                    { name: "emergencyContact.contactNumber", label: "Contact Number", size: 4 },
                                ].map((field, index) => (
                                    <Grid item xs={field.size} key={index}>
                                        <TextField
                                            fullWidth
                                            name={field.name}
                                            label={field.label}
                                            value={formData.emergencyContact?.[field.name.split(".")[1]] || ""}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: true }}
                                            sx={{ mb: 1 }}
                                            size="small"
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </SectionDivider>
                    </Grid>

                    <Grid item xs={12}>
                        <LoadingButton
                            fullWidth
                            size="large"
                            type="submit"
                            color="inherit"
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            Submit
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Box>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                style={{ marginTop: '55px' }}
                />
        </>
    );
}


export default ApplyLeaveFrom;