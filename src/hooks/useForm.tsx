import { useState } from "react";

interface ITarget {
    target: { id: any, name?: any, value?: any};
    value: any;
    loading?: any;
    values?: any
}

export const useForm: any = () => {
    const [values, setValues] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (event: any) => {      
                
        const auxValues: any = { ...values };
        auxValues[event.target.id] = event.target.value;
        
        setValues(auxValues);        
    };
 
 const handleSubmit = (callback: any) => (event: any) => {
        event.preventDefault();
        setLoading(true);
        callback();
        setLoading(false);
    };

    return [{ values, loading }, handleChange, handleSubmit];
};

export default useForm;