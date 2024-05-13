import React from "react";
import { serviceData } from "../../utils/products";

const Wrapper = () => {
  return (
    <section className="bg-white text-center py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {serviceData.map((val, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md"
              style={{ backgroundColor: val.bg }}
            >
              <div className="w-10 h-10 rounded-full flex justify-center items-center bg-gray-200 mx-auto mb-4">
                {val.icon}
              </div>
              <h3 className="text-lg font-medium mb-2">{val.title}</h3>
              <p className="text-sm">{val.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Wrapper;