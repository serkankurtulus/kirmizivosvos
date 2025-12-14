export default function Home() {
  return (
    <>
      {/* Preloader */}
      <div className="loader" style={{ display: 'none' }}>
        <div className="loader-inner">
          <svg width="120" height="220" viewBox="0 0 100 100" className="loading-spinner" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle className="spinner" cx="50" cy="50" r="21" fill="#13181d" strokeWidth="2"/>
          </svg>
        </div>
      </div>

      {/* Wrapper */}
      <div className="wrapper">
        {/* Hero section - Test */}
        <section className="hero" style={{ height: '100vh' }}>
          <div className="background-img overlay zoom" style={{ backgroundImage: 'url(/img/1.jpg)' }}>
          </div>

          {/* Header */}
          <header className="header default">
            <div className="left-part">
              <a className="logo scroll" href="#wrapper">
                <h2 className="mb-0 uppercase">kırmızı vosvos.</h2>
              </a>
            </div>
            <div className="right-part">
              <nav className="main-nav">
                <ul className="main-menu list-inline">
                  <li><a className="scroll list-inline-item" href="#wrapper">Home</a></li>
                  <li><a className="scroll list-inline-item" href="#about">About</a></li>
                  <li><a className="scroll list-inline-item" href="#discography">Discography</a></li>
                  <li><a className="scroll list-inline-item" href="#band">Band</a></li>
                  <li><a className="scroll list-inline-item" href="#tour">Tours</a></li>
                  <li><a className="scroll list-inline-item" href="#gallery">Gallery</a></li>
                  <li><a className="scroll list-inline-item" href="#contact">Contact</a></li>
                </ul>
              </nav>
            </div>
          </header>

          {/* Hero Content */}
          <div className="container hero-content">
            <div className="row">
              <div className="col-sm-12 text-center">
                <div className="inner-hero">
                  <div className="back-rect"></div>
                  <h1 className="large text-white uppercase mb-0">kırmızı vosvos</h1>
                  <h5 className="mb-0 text-white uppercase">Phase 1 Setup Complete - Template Styles Active</h5>
                  <div className="front-rect"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Test Section - About */}
        <section id="about" className="about overlay main">
          <div className="background-img" style={{ backgroundImage: 'url(/img/2.jpg)' }}>
          </div>
          <div className="container">
            <div className="row vertical-align">
              <div className="col-lg-5 col-md-12">
                <div className="front-p">
                  <h1 className="uppercase text-white">Setup Verification</h1>
                  <p className="w-93">
                    If you can see this page with proper styling (dark background, red accents,
                    white text), the Phase 1 setup is complete. The template CSS files are
                    loading correctly.
                  </p>
                  <ul className="block-social list-inline mb-4 mb-lg-0">
                    <li className="list-inline-item mr-0"><a href="#"><i className="socicon-spotify"></i></a></li>
                    <li className="list-inline-item mr-0"><a href="#"><i className="socicon-youtube"></i></a></li>
                    <li className="list-inline-item mr-0"><a href="#"><i className="socicon-instagram"></i></a></li>
                    <li className="list-inline-item mr-0"><a href="#"><i className="socicon-facebook"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Test Section - Checklist */}
        <section className="main bg-secondary" style={{ padding: '80px 0' }}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-10 col-lg-8">
                <div className="block-content text-center">
                  <h1 className="uppercase mb-4">Phase 1 Checklist</h1>
                  <div className="text-left" style={{ background: '#13181d', padding: '30px', borderRadius: '8px' }}>
                    <p><i className="icon-check" style={{ color: '#ff5252' }}></i> Next.js 14 project created</p>
                    <p><i className="icon-check" style={{ color: '#ff5252' }}></i> Dependencies installed (Sanity, Howler.js)</p>
                    <p><i className="icon-check" style={{ color: '#ff5252' }}></i> Folder structure set up</p>
                    <p><i className="icon-check" style={{ color: '#ff5252' }}></i> CSS files copied and imported</p>
                    <p><i className="icon-check" style={{ color: '#ff5252' }}></i> Font files copied</p>
                    <p><i className="icon-check" style={{ color: '#ff5252' }}></i> Images copied</p>
                    <p><i className="icon-check" style={{ color: '#ff5252' }}></i> Google Fonts configured</p>
                    <p><i className="icon-check" style={{ color: '#ff5252' }}></i> Icon fonts loading (Socicon, Fontello)</p>
                  </div>
                  <a className="btn btn-primary uppercase with-ico border-2 mt-5" href="#">
                    <i className="icon-cd-2"></i> Ready for Phase 2
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-5 pb-5 footer">
          <div className="container">
            <div className="row justify-content-between align-items-center">
              <div className="col-md-6">
                <small className="small">
                  <span>&copy; 2025 Kırmızı Vosvos - All rights reserved</span>
                </small>
              </div>
              <div className="col-md-6 text-md-right">
                <ul className="list-inline small">
                  <li className="list-inline-item">
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">Terms of Use</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>

        {/* Back to top */}
        <a className="block-top scroll" href="#wrapper">
          <i className="icon-angle-up"></i>
        </a>
      </div>
    </>
  );
}
