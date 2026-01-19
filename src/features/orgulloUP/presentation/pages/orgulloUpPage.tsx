import GraduateCarousel from "@/features/orgulloUP/presentation/components/graduateCarrusell";
import LayoutOrgulloUP from "@/shared/components/layout/LayoutOrgulloUP";

const OrgulloUpPage = () => {
	const headerLogo = "/UPL2.png";
	const titleImage = "/orgulloUpTitle.png";

	return (
		<div className="min-h-screen bg-gray-50">
			<LayoutOrgulloUP logoSrc={headerLogo} />

			<main className="w-full px-4 pt-0 pb-10 flex flex-col items-center gap-4">
				<img
					src={titleImage}
					alt="Orgullo UP"
					className="w-[300px] h-[80px] object-contain mb-4"
				/>

				<GraduateCarousel />
			</main>
		</div>
	);
};

export default OrgulloUpPage;
