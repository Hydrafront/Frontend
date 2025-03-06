import clsx from "clsx";
import React from "react";

const FormatPrice: React.FC<{
  value: number;
  doller?: boolean;
  color?: string;
}> = ({ value, doller = true, color = "text-white" }) => {
  const formatNumber = (value: number) => {
    let formattedValue;

    if (value >= 1000) {
      // Format as "1.234K"
      formattedValue = (value / 1000).toFixed(3).replace(/\.?0+$/, "") + "K";
    } else if (value < 1 && value > 0) {
      // Convert to string to analyze decimal places
      const valueStr = value.toFixed(20);
      const decimalIndex = valueStr.indexOf(".");

      if (decimalIndex !== -1) {
        const decimalPart = valueStr.substring(decimalIndex + 1);
        const countOfZeros = decimalPart.match(/^0+/);
        const significantDigits = decimalPart.replace(/^0+/, "").slice(0, 4);

        const zerosCount = countOfZeros ? countOfZeros[0].length : 0;

        // Create the formatted string with small-sized span
        formattedValue = value <= 0.01 ? (
          <>
            0.0
            <span className={clsx("text-xs relative top-[2px]", color)}>
              {zerosCount}
            </span>
            {significantDigits}
          </>
        ) : (
          Number(valueStr).toFixed(2)
        );
      } else {
        formattedValue = valueStr; // If no decimal, return as is
      }
    } else {
      // For negative numbers or zero, return as is
      formattedValue = value % 1 === 0 ? value.toString() : value.toFixed(1);
    }

    return formattedValue;
  };

  return (
    <span className={color}>
      {doller ? "$" : ""}
      {formatNumber(value)}
    </span>
  );
};
export default FormatPrice;
