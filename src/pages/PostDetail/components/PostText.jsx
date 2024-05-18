import React from "react";
import CardBox from "../../../components/CardBox";

const PostText = ({ data }) => {
  return (
    <CardBox className="py-8 md:px-14 px-4 mt-8">
      <div className="pb-8">
        <p className="font-semibold md:text-lg text-md">{data.entryHeadline}</p>
      </div>
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
    </CardBox>
  );
};

export default PostText;
