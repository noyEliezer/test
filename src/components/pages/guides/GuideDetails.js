import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

import './GuideDetails.css';
import '@react-pdf-viewer/core/lib/styles/index.css';

const GuideDetails = () => {
  const { guideId } = useParams();
  const [guide, setGuide] = useState({});
  const [noGuide, setNoGuide] = useState(false);
  const [docs, setDocs] = useState([]);
  const [isPdf, setIsPdf] = useState(false);
  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage

        const response = await fetch(
          'https://maint-control-docker-image-2n3aq2y4ja-zf.a.run.app/guides/getSingleGuide',
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ guide_id: guideId }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setGuide(data.answer);
          setDocs([{ uri: data.answer[0].file_path }]);
          setIsPdf(data.answer[0].file_path.toLowerCase().includes('.pdf'));
        } else {
          console.error('Failed to fetch guide');
          setNoGuide(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchGuide();
  }, []);

  return (
    <div className="guideDetail">
      <div className="guideDetailBox">
        {!noGuide && (
          <div className="guideDetailContent">
            <h1>{guide[0]?.title}</h1>
            <p>{guide[0]?.description}</p>
          </div>
        )}
        {noGuide && <h2>No guide data found...</h2>}
        <Link to="../guides">
          <button className="backBtn">Back</button>
        </Link>
      </div>

      {guide[0]?.file_path && isPdf && (
        <div className="pdfViewer">
          <Worker workerUrl="/pdf.worker.min.js">
            <Viewer fileUrl={guide[0].file_path} />
          </Worker>
        </div>
      )}
      {guide[0]?.file_path && !isPdf && (
        <div className="pdfViewer">
          <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
        </div>
      )}
    </div>
  );
};

export default GuideDetails;
