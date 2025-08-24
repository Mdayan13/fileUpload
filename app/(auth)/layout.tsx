import React from "react";
import Image from "next/image";
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <section className="bg-brand p-10 hidden lg:flex justify-center items-center w-1/2">
        <div className="max-h-[800px] max-w-[430px] flex-col justify-center items-center space-y-12">
          <Image
            src="/assets/icons/logo-brand.svg"
            width={224}
            height={92}
            alt="brand-logo"
            className="h-auto"
          />
          <div className="space-y-10 text-white">
            <h1 className="h1">Manage Your Files Here</h1>
            <p className="body-1">
              this could be a right place tostore your All documents
            </p>
          </div>
          <Image
            src="/assets/images/files.png"
            className="transition-all mt-10  hover:scale-105 hover:rotate-2"
            alt="files"
            height={342}
            width={342}
          />
        </div>
      </section>
      <section className="flex flex-1 flex-col bg-white p-5 py-10 lg:justify-center lg:p-10 lg:py-0 items-center">
     <div className="mb-16 lg:hidden">
<Image src="/assets/icons/logo-full-brand.svg" alt="logo-w" className="h-auto w-[200px]" width={224} height={82}/>
     </div>
      {children}
      </section>
    </div>
  );
};

export default layout;
