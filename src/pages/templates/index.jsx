import FadeIn from "react-fade-in";
import { NavbarScrollable } from "@/components/atoms/navbar/scrollable";
import ReadmeResponsive from "@/components/atoms/readme-responsive";
import FooterTemplate from "@/components/atoms/footer/default";
import TemplateForm from "@/components/templates/templates-form";
import TemplateButton from "@/components/templates/template-button";

const index = () => {
    const navbarState = [
        // { label: "Filter", value: "4", description: <TemplateFilter /> },
        { label: "Button", value: "2", description: <TemplateButton /> },
        // { label: "Tooltips", value: "3", description: <TemplateTooltip /> },
        { label: "Form", value: "1", description: <TemplateForm /> },
        // { label: "Pop Up", value: "5", description: <TemplatePopUp /> },
        // { label: "Card", value: "6", description: <TemplateCard /> },
        // { label: "Table", value: "7", description: <TemplateTable /> },
        // { label: "Others", value: "8", description: <TemplateOthers /> },
        // { label: "Charts", value: "9", description: <TemplateChart /> },
        // { label: "Editor", value: "10", description: <TemplateEditor /> },
        // { label: "Multiple Select", value: "11", description: <TemplateMultipleSelect /> },
        // { label: "Komentar", value: "12", description: <TemplateKomentar /> },
        // { label: "IFrame", value: "13", description: <TemplateIFrame /> },
        // { label: "Navigation Tabs", value: "14", description: <TemplateNavTabs /> },
      ];
  return (
    <>
        <FadeIn className="p-4 lg:p-8 h-screen overflow-auto bg-[#F7F7F7]">
            <p
                className="font-bold text-center"
                style={{ color: "#084F8C", marginBottom: "30px", fontSize: "24px" }}
            >
                Template Aplikasi Terupdate
            </p>
            <NavbarScrollable navData={navbarState} sx={{ mb: 3 }} isTabDisabled={false}/>
            <ReadmeResponsive />
            <FooterTemplate />
        </FadeIn>
    </>
  )
}

export default index