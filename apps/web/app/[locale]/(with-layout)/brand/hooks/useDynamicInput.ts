import { useState } from 'react';

export function useDynamicInputs(initialValue: string[] = ['']) {
  const [fields, setFields] = useState<string[]>(initialValue);

  const addField = () => {
    setFields((prev) => [...prev, '']);
  };

  const removeField = (index: number) => {
    if (fields.length > 1) {
      setFields((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const updateField = (index: number, value: string) => {
    setFields((prev) => prev.map((item, i) => (i === index ? value : item)));
  };

  return {
    fields,
    addField,
    removeField,
    updateField,
  };
}
