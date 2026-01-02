import{R as e}from"./index-31513354.js";function a(){return e.createElement("div",{className:"admin-panel"},e.createElement("div",{className:"admin-header"},e.createElement("h1",null,"📊 Admin Dashboard"),e.createElement("p",{className:"admin-subtitle"},"This component was lazy-loaded! Check Network tab to see separate chunk downloaded.")),e.createElement("div",{className:"admin-content"},e.createElement("section",{className:"admin-section"},e.createElement("h2",null,"📈 Analytics"),e.createElement("div",{className:"placeholder-chart"},e.createElement("p",null,"Chart Component (code-split)"),e.createElement("p",{className:"note"},"In production, you'd use: recharts, Chart.js, or similar"))),e.createElement("section",{className:"admin-section"},e.createElement("h2",null,"👥 User Management"),e.createElement("div",{className:"admin-table"},e.createElement("table",null,e.createElement("thead",null,e.createElement("tr",null,e.createElement("th",null,"ID"),e.createElement("th",null,"Username"),e.createElement("th",null,"Role"),e.createElement("th",null,"Status"))),e.createElement("tbody",null,e.createElement("tr",null,e.createElement("td",null,"1"),e.createElement("td",null,"john_admin"),e.createElement("td",null,"Admin"),e.createElement("td",null,"Active")),e.createElement("tr",null,e.createElement("td",null,"2"),e.createElement("td",null,"jane_editor"),e.createElement("td",null,"Editor"),e.createElement("td",null,"Active")),e.createElement("tr",null,e.createElement("td",null,"3"),e.createElement("td",null,"bob_viewer"),e.createElement("td",null,"Viewer"),e.createElement("td",null,"Inactive")))))),e.createElement("section",{className:"admin-section"},e.createElement("h2",null,"⚙️ Settings"),e.createElement("div",{className:"admin-settings"},e.createElement("label",{className:"setting-item"},e.createElement("input",{type:"checkbox",defaultChecked:!0}),"Enable email notifications"),e.createElement("label",{className:"setting-item"},e.createElement("input",{type:"checkbox",defaultChecked:!0}),"Enable analytics tracking"),e.createElement("label",{className:"setting-item"},e.createElement("input",{type:"checkbox"}),"Enable maintenance mode")))),e.createElement("style",null,`
        .admin-panel {
          padding: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .admin-header {
          margin-bottom: 40px;
        }

        .admin-header h1 {
          margin: 0 0 10px 0;
          font-size: 28px;
        }

        .admin-subtitle {
          margin: 0;
          color: #666;
          font-size: 14px;
        }

        .admin-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 30px;
        }

        .admin-section {
          background: #f5f5f5;
          padding: 20px;
          border-radius: 8px;
        }

        .admin-section h2 {
          margin: 0 0 15px 0;
          font-size: 18px;
        }

        .placeholder-chart {
          background: white;
          padding: 40px;
          border-radius: 6px;
          text-align: center;
          color: #999;
        }

        .placeholder-chart .note {
          font-size: 12px;
          margin-top: 10px;
        }

        .admin-table {
          overflow-x: auto;
        }

        .admin-table table {
          width: 100%;
          border-collapse: collapse;
          background: white;
        }

        .admin-table th,
        .admin-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }

        .admin-table th {
          background: #f0f0f0;
          font-weight: 600;
        }

        .admin-table tr:hover {
          background: #fafafa;
        }

        .admin-settings {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .setting-item {
          display: flex;
          align-items: center;
          cursor: pointer;
          padding: 8px;
          border-radius: 4px;
          transition: background 0.2s;
        }

        .setting-item:hover {
          background: white;
        }

        .setting-item input {
          margin-right: 10px;
          cursor: pointer;
        }
      `))}export{a as AdminPanel,a as default};
