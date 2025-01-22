import ReactDom from 'react-dom';

import { Overlay } from './styles';

export default function Loader({ isLoading }) {
  if (!isLoading) {
    return null;
  }

  return ReactDom.createPortal(
    <Overlay>
      <div className="loader">
        <svg viewBox="25 25 50 50">
          <title>Loading...</title>
          <circle r="20" cy="50" cx="50" />
        </svg>
      </div>
    </Overlay>,
    document.getElementById('loader-root'),
  );
}
