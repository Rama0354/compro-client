const styles = {
boxWidth: "xl:max-w-[1280px] w-full",

title: "w-full font-poppins font-semibold text-xl text-green-600 uppercase leading-3",
heading1: "font-poppins font-semibold xs:text-[48px] text-[40px] text-green-600 xs:leading-[76.8px] leading-[66.8px] w-full",
heading2: "font-poppins font-semibold xs:text-[28px] text-[21px] text-green-600 xs:leading-[33.8px] leading-[21.8px] w-full",
paragraph: "font-poppins font-normal text-slate-600 text-[16px] sm:text-[18px] sm:leading-[30.8px] leading-[21.8px]",
button: "py-2 px-3 font-poppins font-semibold text-sm duration-150",
buttonImg: "m-0 p-0 w-max rounded-full flex items-center",

formLabel: "w-40 p-3 inline-block font-poppins font-semibold text-sm sm:text-base text-slate-500",
formFile: "w-96 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-600 hover:file:bg-green-200",

flexCenter: "flex justify-center items-center",
flexStart: "flex justify-center items-start",
paddingX: "sm:px-16 px-6",
paddingY: "sm:py-16 py-6",
padding: "sm:px-16 px-6 sm:py-12 py-4",

marginX: "sm:mx-16 mx-6",
marginY: "sm:my-16 my-6",
};

export const layout = {
section: `flex md:flex-row flex-col ${styles.paddingY}`,
sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,

sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
sectionImg: `flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,

sectionInfo: `flex-1 ${styles.flexStart} flex-col`,
};

export default styles;