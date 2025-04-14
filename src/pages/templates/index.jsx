import FadeIn from "react-fade-in";
import { NavbarScrollable } from "@/components/atoms/navbar/scrollable";
import ReadmeResponsive from "@/components/atoms/readme-responsive";
import FooterTemplate from "@/components/atoms/footer/default";
import TemplateForm from "@/components/templates/templates-form";
import TemplateButton from "@/components/templates/template-button";

const index = () => {
    const navbarState = [
        { label: "Form", value: "1", description: <TemplateForm /> },
        { label: "Button", value: "2", description: <TemplateButton /> },
        { label: "Chart", value: "3", description: <TemplateButton /> },
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