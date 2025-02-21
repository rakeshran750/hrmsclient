import { useState } from "react";
import { Box, Grid, TextField, Typography, MenuItem  } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SectionDivider from "src/components/SectionDivider";
import { ToastContainer, toast } from 'react-toastify';
import api from "src/utils/api";


// ----------------------------------------------------------------------
function ApplyLeaveFrom() {
    
    const [leaveType, setLeaveType] = useState(['EL', 'CL', 'SL','Other'])
    const [formData, setFormData] = useState({    
        "leaveType": "EL",
        "leaveFrom": "21-02-2025",
        "leaveUpTo": "21-02-2025"
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
    const handleSubmit = async () => {
        const { data } = await api.post('/leave',formData)
        if (data.success) {
            notify("Leave Applied  Successfully")
            setTimeout(() => {
            setIsformOpen(false)
            }, 1000);
        } else {
            notify("Error in Leave applicationl!XXXXX")
        }
    };

    return (
        <>
            <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 1, mt: 2 }}>
                <Typography variant="h5">Leave Apply Form</Typography>
            </Box>

            <Box display="flex" flexDirection="column" alignItems="flex-end" padding="10px">
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <SectionDivider title="Leave Details">
                            <Grid container spacing={1}>
                                {/* {[                                   
                                    { name: "leave_from",type:'date', label: "Leave From", size: 6 },
                                    { name: "leave_upto",type:'date', label: "Leave Upto", size: 6 },
                                ].map((field, index) => (
                                    <Grid item xs={field.size} key={index}>
                                        <TextField
                                            fullWidth
                                            type={field.type}
                                            name={field.name}
                                            label={field.label}
                                            value={formData[field.name] || ""}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: true }}
                                            sx={{ mb: 1 }}
                                            size="small"
                                            inputProps={{ min: "2024-02-21" }}
                                        />
                                    </Grid> */}
                                {/* ))} */}
                                <Grid item xs='4'>

                                        <TextField
                                        fullWidth
                                        select
                                        name="leaveType"
                                        label="Leave Type"
                                        value={formData.leaveType || ""}
                                        onChange={handleChange}
                                        InputLabelProps={{ shrink: true }}
                                        sx={{ mb: 1 }}
                                        size="small"
                                        >
                                        {['EL', 'CL', 'SL', 'Other'].map((option) => (
                                            <MenuItem key={option} value={option}>
                                            {option}
                                            </MenuItem>
                                        ))}
                                        </TextField>
                                </Grid>
                                
                                <Grid item xs='4'>
                                    <TextField
                                        fullWidth
                                        type='date'
                                        name='leaveFrom'
                                        label='Leave From'
                                        value={formData.leaveFrom || ""}
                                        onChange={handleChange}
                                        InputLabelProps={{ shrink: true }}
                                        sx={{ mb: 1 }}
                                        size="small"
                                        inputProps={{ min: "2024-02-21" }}
                                    />
                                </Grid>
                                <Grid item xs='4'>
                                    <TextField
                                        fullWidth
                                        type='date'
                                        name='leaveUpTo'
                                        label='Leave Upto'
                                        value={formData.leaveUpTo || ""}
                                        onChange={handleChange}
                                        InputLabelProps={{ shrink: true }}
                                        sx={{ mb: 1 }}
                                        size="small"
                                        inputProps={{ min: "2024-02-21" }}
                                    />
                                </Grid>


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