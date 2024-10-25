import { ApplicationService } from './app.service.js';

export class ApplicationController {
  private service: ApplicationService;

  constructor() {
    this.service = new ApplicationService();
  }

  async getApplications(req, res) {
    try {
      const applications = await this.service.getAllApplications();
      res.status(200).json(applications);
    } catch (error) {
      console.error("Error in getApplications (controller):", error);
      res.status(500).json({ error: 'Failed to fetch applications' });
    }
  }

  async getApplication(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const application = await this.service.getApplication(id);

      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }

      res.status(200).json(application);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch application' });
    }
  }
}
