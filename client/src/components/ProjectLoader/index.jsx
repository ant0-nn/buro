import React from 'react';
import { css } from '@emotion/react';
import { BeatLoader } from 'react-spinners';

const ProjectLoader = ({ loading }) => {
  const override = css`
    display: block;
    margin: 0 auto;
  `;

  return (
    <>
      {loading && (
        <div
          className="project-loader"
          style={{
            position: 'fixed',
            top: '16%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}>
          <BeatLoader color="#BF1616" loading={true} css={override} size={20} />
        </div>
      )}
    </>
  );
};

export default React.memo(ProjectLoader);
