import { Grid, useMediaQuery } from "@mui/material";
import { CardDefault } from "@/components/atoms/card/default";
import { useForm } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import { FormBuilder, FORM_TYPE } from "@/components/organisms/forms/builder";
import { ButtonDefault } from "@/components/atoms/buttons/default";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

const TemplateForm = () => {
    const isSm = useMediaQuery("(max-width: 575px)");
    const isMd = useMediaQuery("(max-width: 959px)");
    const exampleOptions = [
        { label: "SMA", value: "SMA" },
        { label: "D-1", value: "D-1" },
        { label: "D-2", value: "D-2" },
        { label: "D-3", value: "D-3" },
        { label: "S-1", value: "S-1" },
        { label: "S-2", value: "S-2" },
        { label: "S-3", value: "S-3" },
    ];

    const defaultValues = {
        template_input: "",
    };

    const validationSchema = object({
        template_input: string().required("Kolom Wajib Diisi"),
    });

    const methods = useForm({
        mode: "all",
        defaultValues,
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = () => {
        
    }

    const handleInputHanyaAngka = (e) => {
        // Get the input value
        const inputValue = e.target.value;
        const filteredValue = inputValue.replace(
            /[^0-9]/g, ''
        );

        e.target.value = filteredValue;
        // Set the filtered value as the input value
    };

    const handleInputNama = (e) => {
        const inputValue = e.target.value;
        const filteredValue = inputValue.replace(
            /[^a-zA-Z\s']/g, ''
        );

        e.target.value = filteredValue;
    }
    return (
        <Grid container spacing={2} className="mb-2">
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <CardDefault
                    className="flex xl:w-900 px-4 py-4 my-4"
                    sx={{ width: isSm ? "100%" : isMd ? "80%" : "60%" }}
                    label="Filter"
                    icon={<SearchIcon />}
                >
                    <FormBuilder
                        className="grid grid-cols-1 gap-2"
                        size="small"
                        fields={[
                            {
                                type: FORM_TYPE.TEXT_FIELD,
                                name: "template_input",
                                title: "Input Hanya Angka",
                                placeholder: "Masukan Angka",
                                onInput: handleInputHanyaAngka,
                            },
                            {
                                type: FORM_TYPE.TEXT_FIELD,
                                name: "template_input2",
                                title: "Input Hanya Alphabet",
                                placeholder: "Masukan Alphabet",
                                onInput: handleInputNama
                            },
                            {
                            type: FORM_TYPE.CUSTOM,
                            component: (
                                <div className="gap-2 flex justify-end mt-3">
                                <ButtonDefault
                                    sx={{
                                    padding: "6px 24px",
                                    }}
                                    model="outline"
                                    color="#ED6E12"
                                    // onClick={onReset}
                                    className="flex"
                                    // startIcon={<RefreshIcon />}
                                >
                                    Reset
                                </ButtonDefault>
                                <ButtonDefault
                                    sx={{
                                    padding: "6px 24px",
                                    }}
                                    model="fill"
                                    color="#ED6E12"
                                    type="submit"
                                    className="flex"
                                    startIcon={<SearchIcon />}
                                >
                                    Cari
                                </ButtonDefault>
                                </div>
                            ),
                            },
                        ]}
                        methods={methods}
                        onSubmit={onSubmit}
                        />
                </CardDefault>
            </Grid>
        </Grid>
    )
}

export default TemplateForm