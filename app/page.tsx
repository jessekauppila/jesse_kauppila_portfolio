//this is the main page

import {
  fetchProjects,
  GraphQLFetchError,
} from '@/lib/fetchProjects';
import ProjectSection from '@/components/ProjectSection';

// Revalidate this page every 60 seconds
export const revalidate = 60;

export default async function HomePage() {
  let projects;
  try {
    projects = await fetchProjects();
  } catch (error) {
    console.error('[HomePage] Failed to fetch projects:', error);
    // Return error UI
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-semibold mb-4">
            Unable to load projects
          </h1>
          <p className="text-gray-600 mb-4">
            {error instanceof GraphQLFetchError
              ? error.message
              : 'An error occurred while fetching projects. Please try again later.'}
          </p>
          {process.env.NODE_ENV === 'development' &&
            error instanceof Error && (
              <pre className="text-xs text-left bg-gray-100 p-4 rounded mt-4 overflow-auto">
                {error.stack}
              </pre>
            )}
        </div>
      </div>
    );
  }

  const software = projects.filter((p) => p.category === 'software');
  const fab = projects.filter((p) => p.category === 'fabrication');
  const art = projects.filter((p) => p.category === 'art');
  //const software = projects.filter((p) => p.category === 'software');

  return (
    <>
      <div className="nav is-accent-primary">
        <div
          data-duration="400"
          data-animation="default"
          data-easing2="ease"
          data-easing="ease"
          data-collapse="medium"
          role="banner"
          data-no-scroll="1"
          className="nav_container w-nav"
        >
          <div className="nav_left">
            <a href="#" className="nav_logo w-inline-block">
              <div className="nav_logo-icon">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 33 33"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path
                    d="M28,0H5C2.24,0,0,2.24,0,5v23c0,2.76,2.24,5,5,5h23c2.76,0,5-2.24,5-5V5c0-2.76-2.24-5-5-5ZM29,17c-6.63,0-12,5.37-12,12h-1c0-6.63-5.37-12-12-12v-1c6.63,0,12-5.37,12-12h1c0,6.63,5.37,12,12,12v1Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div
                data-brand-name="true"
                className="paragraph_large margin-bottom_none"
              >
                Jesse Kauppila
              </div>
            </a>
          </div>
          <div className="nav_right">
            <nav role="navigation" className="nav_menu w-nav-menu">
              <ul
                role="list"
                className="nav_menu-list w-list-unstyled"
              >
                <li className="nav_menu-list-item">
                  <a
                    href="#"
                    className="nav_link on-accent-primary w-inline-block"
                  >
                    <div>Software Development</div>
                  </a>
                </li>
                <li className="nav_menu-list-item">
                  <a
                    href="#"
                    className="nav_link on-accent-primary w-inline-block"
                  >
                    <div>Manufacturing/Fabrication/Design</div>
                  </a>
                </li>
                <li className="nav_menu-list-item">
                  <a
                    href="#"
                    className="nav_link on-accent-primary w-inline-block"
                  >
                    <div>Industrial Robotics</div>
                  </a>
                </li>
                <li className="nav_menu-list-item">
                  <a
                    href="#"
                    className="nav_link on-accent-primary w-inline-block"
                  >
                    <div>Art</div>
                  </a>
                </li>
                <li className="nav_menu-list-item">
                  <a
                    href="#"
                    className="nav_link on-accent-primary w-inline-block"
                  >
                    <div>About</div>
                  </a>
                </li>
                <li className="nav_menu-list-item">
                  <a
                    href="#"
                    className="nav_link on-accent-primary w-inline-block"
                  >
                    <div>Contact</div>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="nav_mobile-menu-button w-nav-button">
            <div className="icon on-accent-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g
                  className="nc-icon-wrapper"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  strokeWidth="1.5"
                  fill="none"
                  stroke="currentColor"
                  strokeMiterlimit="10"
                >
                  <line
                    x1="1"
                    y1="12"
                    x2="23"
                    y2="12"
                    stroke="currentColor"
                  />
                  <line x1="1" y1="5" x2="23" y2="5" />
                  <line x1="1" y1="19" x2="23" y2="19" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <section className="section-2">
        <div className="container">
          <div
            id="w-node-_4a9414b7-ae42-3064-7d06-d31acfde2a8f-cfde2a8c"
            className="header w-node-_180372cf-ab25-c091-8fda-3f31a262591d-ed364b4d"
          >
            <div
              id="w-node-_3ad870d0-35be-1d61-bcd5-f2b25220ad3c-5220ad31"
              className="w-layout-grid grid_3-col gap-xsmall text-align_center w-node-a39f0861-f2f8-8cd2-42f5-143f527e0dda-ed364b4d"
            >
              <div
                id="w-node-_4a9414b7-ae42-3064-7d06-d31acfde2a8f-cfde2a8c"
                className="header w-node-b016f715-7923-3c45-50ce-6d4d3fdf6049-ed364b4d"
              >
                <h1 className="heading_h1">Project Portfolio</h1>
                <p className="paragraph">
                  I have extensive experience at the cross section of
                  design engineering, custom complex robotic
                  fabrication/manufacturing, and software development.
                  These are some of the projects I&apos;ve been
                  involved in.
                  <br />
                  <br />
                  <br />‍
                </p>
              </div>
              <section></section>
            </div>
          </div>
        </div>
      </section>
      <ProjectSection title="Software Projects" projects={software} />
      <ProjectSection title="Fabrication Projects" projects={fab} />
      <ProjectSection title="Art Projects" projects={art} />
      {/* <section>
        <div className="container">
          <div className="container">
            <h1 className="heading_h1">Software Projects</h1>
            <div
              id="w-node-_3ad870d0-35be-1d61-bcd5-f2b25220ad3c-5220ad31"
              className="w-layout-grid grid_3-col gap-xsmall text-align_center w-node-_02b41635-a2e6-2543-1e3f-a577e175df40-ed364b4d"
            >
              <div
                id="w-node-_3ad870d0-35be-1d61-bcd5-f2b25220ad46-5220ad31"
                className="card card_body padding-bottom_none on-secondary w-node-_73552ae1-e304-a491-4e71-0ded70d9e571-ed364b4d"
              >
                <div className="flex_vertical gap-small height_100percent">
                  <div className="w-layout-grid grid">
                    <div
                      data-delay="4000"
                      data-animation="slide"
                      className="slider-2 w-slider"
                      data-autoplay="false"
                      data-easing="ease"
                      data-hide-arrows="false"
                      data-disable-swipe="false"
                      data-autoplay-limit="0"
                      data-nav-spacing="3"
                      data-duration="500"
                      data-infinite="true"
                      id="w-node-_73552ae1-e304-a491-4e71-0ded70d9e574-ed364b4d"
                    >
                      <div className="w-slider-mask">
                        <div className="slide w-slide"></div>
                        <div className="w-slide"></div>
                        <div className="w-slide"></div>
                      </div>
                      <div className="w-slider-arrow-left">
                        <div className="w-icon-slider-left"></div>
                      </div>
                      <div className="w-slider-arrow-right">
                        <div className="w-icon-slider-right"></div>
                      </div>
                      <div className="w-slider-nav w-round w-num"></div>
                    </div>
                    <section className="section-3">
                      <div className="w-layout-grid grid-2">
                        <section>
                          <h1 className="heading_h1 heading_h2">
                            Test 2
                          </h1>
                          <p className="subheading">
                            Tools: React/Typescript/Mapbox/DeckGL
                          </p>
                          <p className="subheading">Client: NWAC</p>
                        </section>
                        <p
                          id="w-node-_461e5244-89b4-6317-4ff7-9dd6de9f1be3-ed364b4d"
                          className="paragraph"
                        >
                          Dive into a selection of projects that blend
                          creativity with functionality. Experience
                          sleek, modern aesthetics tailored for
                          you.asdfas
                          <br />
                          <br />
                          <br />‍
                        </p>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <section>
        <div className="container">
          <div className="container">
            <div
              id="w-node-_3ad870d0-35be-1d61-bcd5-f2b25220ad3c-5220ad31"
              className="w-layout-grid grid_3-col gap-xsmall text-align_center w-node-_4cccf264-cc36-2aa7-67be-466e60c97e5e-ed364b4d"
            >
              <div
                id="w-node-_3ad870d0-35be-1d61-bcd5-f2b25220ad46-5220ad31"
                className="card-copy card_body padding-bottom_none on-secondary w-node-_4cccf264-cc36-2aa7-67be-466e60c97e5f-ed364b4d"
              >
                <div className="flex_vertical gap-small height_100percent">
                  <section id="w-node-_4cccf264-cc36-2aa7-67be-466e60c97e6c-ed364b4d">
                    <h1 className="heading_h1 heading_h2">About</h1>
                    <p className="paragraph">
                      While getting an MFA at Carnegie Mellon my art
                      projects led me to the power of robotics. I then
                      began a career using robots professionally to
                      fabricate a variety of art and architectural
                      projects. That work led to aerospace research
                      and development at Joby Aviation. To help with
                      these projects I developed a variety of software
                      tools including robotic simulations, computer
                      vision, and design optimizations. At Joby I
                      began working in software development full time.
                      There I developed a manufacturing data analytics
                      and visualization platform. Most recently
                      I&apos;ve been working on a weather app for the
                      Northwest Avalanche Center. I continue to work
                      on a variety of personal software, fabrication,
                      and art projects.
                      <br />
                      <br />
                      <br />‍
                    </p>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="container">
          <div className="footer_bottom">
            <div className="text-color_secondary">
              © 2025 Jesse Kauppila. All rights reserved.
            </div>
            <div className="text-color_secondary"></div>
          </div>
        </div>
      </footer>
    </>
  );
}
