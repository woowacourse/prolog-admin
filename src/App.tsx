import { Admin, CustomRoutes, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import MissionCreate from './reactAdminPages/MissionCreate';
import Missions from './reactAdminPages/Missions';
import Sessions from './reactAdminPages/Sessions';
import SessionCreate from './reactAdminPages/SessionCreate';
import { Route } from 'react-router-dom';
import MyLayout from './Layout';
import { BASE_URL } from './client';


import PopularStudylogsUpdate from './customPages/PopularStudylogsUpdatePage';
import RoadmapSelectSessionPage from './customPages/RoadmapSelectSessionPage';
import RoadMapSelectTopKeywordPage from './customPages/RoadmapSelectTopKeywordPage';
import RoadmapTopKeywordsPage from './customPages/RoadmapTopKeywordsPage';
import RoadmapEditKeywordPage from './customPages/RoadmapEditKeywordPage';
import RoadmapQuizsPage from './customPages/RoadmapQuizsPage';
import Members from './reactAdminPages/Member';

const dataProvider = jsonServerProvider(BASE_URL);

function App() {
  return (
    <Admin layout={MyLayout} dataProvider={dataProvider}>
      <Resource name="missions" list={Missions} create={MissionCreate} />
      <Resource name="sessions" list={Sessions} create={SessionCreate} />
      <CustomRoutes>
        <Route path="/members" element={<Members />} />
        <Route path="/studylogs" element={<PopularStudylogsUpdate />} />
        <Route path="/roadmap" element={<RoadmapSelectSessionPage />} />
        <Route
          path="/roadmap/:sessionId"
          element={<RoadMapSelectTopKeywordPage />}
        />
        <Route
          path="/roadmap/:sessionId/:keywordId/quizs"
          element={<RoadmapQuizsPage />}
        />
        <Route
          path="/roadmap/:sessionId/:keywordId/editSubKeywords"
          element={<RoadmapEditKeywordPage />}
        />
        <Route
          path="/roadmap/:sessionId/:keywordId"
          element={<RoadmapTopKeywordsPage />}
        />
      </CustomRoutes>
    </Admin>
  );
}

export default App;
