
import React from 'react';

interface TallyEmbedProps {
  formId: string;
  title?: string;
}

export const TallyEmbed: React.FC<TallyEmbedProps> = ({ formId, title = "Form" }) => {
  return (
    <div className="w-full h-screen overflow-hidden bg-white">
      <iframe
        src={`https://tally.so/embed/${formId}?hideTitle=1&transparentBackground=1&dynamicHeight=1`}
        width="100%"
        height="100%"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title={title}
        className="min-h-[600px]"
      ></iframe>
    </div>
  );
};
