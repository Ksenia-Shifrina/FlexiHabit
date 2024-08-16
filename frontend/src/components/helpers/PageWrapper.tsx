export interface PageWrapperProps {
  children: React.ReactNode;
  displayedPage: number;
  num: number;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, displayedPage, num }) => {
  return (
    <div
      style={{
        visibility: displayedPage === num ? 'visible' : 'hidden',
        position: displayedPage === num ? 'static' : 'absolute',
        height: '100%',
      }}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
