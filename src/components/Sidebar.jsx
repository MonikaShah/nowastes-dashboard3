import { useState } from "react";
import "../styles/Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLayerGroup,
  faSlidersH,
  faChartBar,
  faCircleInfo as faInfo,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(null);

  const toggleTab = (index) => {
    setActiveTab(activeTab === index ? null : index);
  };

  const tabs = [
    { icon: <FontAwesomeIcon icon={faLayerGroup} />, label: "Layers" },
    { icon: <FontAwesomeIcon icon={faSlidersH} />, label: "Controls" },
    { icon: <FontAwesomeIcon icon={faChartBar} />, label: "Chart" },
    { icon: <FontAwesomeIcon icon={faInfo} />, label: "About" },
  ];

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div className={`sidebar-tab ${activeTab === 0 ? "active" : ""}`}>
          <button className="tab-button" onClick={() => toggleTab(0)}>
            {tabs[0].icon}
          </button>
        </div>
        <div className={`sidebar-tab ${activeTab === 1 ? "active" : ""}`}>
          <button className="tab-button" onClick={() => toggleTab(1)}>
            {tabs[1].icon}
          </button>
        </div>
        <div className={`sidebar-tab ${activeTab === 2 ? "active" : ""}`}>
          <button className="tab-button" onClick={() => toggleTab(2)}>
            {tabs[2].icon}
          </button>
        </div>
        <div className={`sidebar-tab ${activeTab === 3 ? "active" : ""}`}>
          <button className="tab-button" onClick={() => toggleTab(3)}>
            {tabs[3].icon}
          </button>
        </div>
      </div>
      {/* SidebarContent div */}
      <div className={`sidebar-content ${activeTab !== null ? "visible" : ""}`}>
        {activeTab !== null && (
          <>
            <div className="sidebar-content-heading">
              <h2>{tabs[activeTab]?.label}</h2>
              <button className="close-button" onClick={() => toggleTab(null)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="sidebar-content-body">
              {/* Additional content for the active tab */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. At
              volutpat diam ut venenatis tellus in metus vulputate eu. Euismod
              in pellentesque massa placerat duis ultricies lacus. Orci ac
              auctor augue mauris augue neque gravida in fermentum. Nunc
              pulvinar sapien et ligula ullamcorper malesuada proin libero nunc.
              Donec enim diam vulputate ut pharetra sit amet aliquam. Ut eu sem
              integer vitae justo eget magna fermentum iaculis. Est pellentesque
              elit ullamcorper dignissim cras tincidunt lobortis feugiat
              vivamus. Blandit cursus risus at ultrices mi tempus imperdiet
              nulla malesuada. Tortor pretium viverra suspendisse potenti
              nullam. Est velit egestas dui id ornare arcu odio ut. Mauris in
              aliquam sem fringilla ut morbi tincidunt. Mi proin sed libero enim
              sed faucibus turpis. Varius quam quisque id diam vel quam. Viverra
              tellus in hac habitasse platea dictumst vestibulum rhoncus. Et
              odio pellentesque diam volutpat commodo sed egestas egestas
              fringilla. Non curabitur gravida arcu ac tortor dignissim
              convallis aenean et. Donec et odio pellentesque diam volutpat
              commodo sed egestas egestas. Nulla at volutpat diam ut venenatis.
              Tincidunt dui ut ornare lectus sit. Pharetra sit amet aliquam id.
              Augue mauris augue neque gravida. Elit ullamcorper dignissim cras
              tincidunt lobortis. Ac feugiat sed lectus vestibulum mattis
              ullamcorper velit sed. Etiam dignissim diam quis enim lobortis
              scelerisque fermentum dui. Viverra mauris in aliquam sem fringilla
              ut morbi. Arcu cursus vitae congue mauris rhoncus aenean vel elit.
              Lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit
              amet. Porta lorem mollis aliquam ut porttitor leo a diam
              sollicitudin. Erat velit scelerisque in dictum non consectetur a.
              Fermentum dui faucibus in ornare quam viverra. Elit duis tristique
              sollicitudin nibh sit. Pretium vulputate sapien nec sagittis
              aliquam malesuada bibendum arcu vitae. Sed felis eget velit
              aliquet sagittis id consectetur. In aliquam sem fringilla ut morbi
              tincidunt augue. Ac tortor dignissim convallis aenean et tortor.
              Risus viverra adipiscing at in tellus integer feugiat. Nunc
              aliquet bibendum enim facilisis gravida neque convallis. In nulla
              posuere sollicitudin aliquam ultrices sagittis orci a scelerisque.
              Tristique sollicitudin nibh sit amet commodo. Nulla facilisi
              nullam vehicula ipsum a arcu cursus vitae. Elementum tempus
              egestas sed sed risus pretium quam vulputate dignissim. Habitant
              morbi tristique senectus et netus et malesuada fames ac. Blandit
              cursus risus at ultrices mi. Arcu dictum varius duis at
              consectetur lorem donec. Orci eu lobortis elementum nibh tellus.
              Hendrerit dolor magna eget est lorem. Dignissim enim sit amet
              venenatis urna cursus. Lacinia quis vel eros donec ac odio tempor
              orci dapibus. Commodo nulla facilisi nullam vehicula ipsum a arcu
              cursus. Elit duis tristique sollicitudin nibh sit amet commodo
              nulla. Fusce ut placerat orci nulla pellentesque. Nisi scelerisque
              eu ultrices vitae auctor eu. Massa vitae tortor condimentum
              lacinia quis vel. Quis viverra nibh cras pulvinar mattis nunc.
              Fames ac turpis egestas sed. Proin sed libero enim sed faucibus.
              Adipiscing diam donec adipiscing tristique risus nec feugiat.
              Tortor at risus viverra adipiscing. In nisl nisi scelerisque eu.
              Ultrices vitae auctor eu augue ut lectus. Risus feugiat in ante
              metus dictum at tempor commodo ullamcorper. Aliquam id diam
              maecenas ultricies mi eget mauris pharetra et. Ultrices gravida
              dictum fusce ut placerat.
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
