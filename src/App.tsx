import { Admin, Resource, CustomRoutes } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import MissionCreate from './reactAdminPages/MissionCreate';
import SessionCreate from './reactAdminPages/SessionCreate';
import { Route } from 'react-router-dom';
import MyLayout from './Layout';
import { BASE_URL } from './client';
import Missions from './reactAdminPages/Missions';
import Sessions from './reactAdminPages/Sessions';
import PopularStudylogsUpdate from './customPages/PopularStudylogsUpdatePage';
import RoadmapSelectSessionPage from './customPages/RoadmapSelectSessionPage';
import RoadMapSelectTopKeywordPage from './customPages/RoadmapSelectTopKeywordPage';
import RoadmapTopKeywordsPage from './customPages/RoadmapTopKeywordsPage';
import RoadmapEditKeywordPage from './customPages/RoadmapEditKeywordPage';
import RoadmapQuizsPage from './customPages/RoadmapQuizsPage';

const dataProvider = jsonServerProvider(BASE_URL);

function App() {
  return (
    <Admin layout={MyLayout} dataProvider={dataProvider}>
      <Resource name="missions" list={Missions} create={MissionCreate} />
      <Resource name="sessions" list={Sessions} create={SessionCreate} />
      <CustomRoutes>
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
          path="/roadmap/:sessionId/:keywordId"
          element={<RoadmapTopKeywordsPage />}
        />
        <Route
          path="/roadmap/:sessionId/editSubKeywords"
          element={<RoadmapEditKeywordPage />}
        />
      </CustomRoutes>
    </Admin>
  );
}

export default App;
