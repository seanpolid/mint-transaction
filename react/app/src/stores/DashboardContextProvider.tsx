import { ReactNode, useState } from "react";

import { DashboardContext, Context, defaultContext, Options } from "./DashboardContext";

type Props = {
	children: ReactNode;
};

export const DashboardContextProvider = (props: Props) => {
    const [options, setOptions] = useState(defaultContext.options);

    const updateOptions = (optionName: string, optionValue: string | Date | boolean) => {
        setOptions((prevOptions: Options) => ({
            ...prevOptions,
            [optionName]: optionValue
        }))
    }

    const data: Context = {
        options: options,
        updateOptions: updateOptions
    }

    return (
        <DashboardContext.Provider value={data}>
            {props.children}
        </DashboardContext.Provider>
    )
};
