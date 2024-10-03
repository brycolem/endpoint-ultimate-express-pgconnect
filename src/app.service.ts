import db from './app.db.config.js';
import { Application } from './model/application.js';

export class ApplicationService {
  async getAllApplications(): Promise<Application[]> {
    return await db.any(`
      SELECT
        applications.id,
        applications.employer,
        applications.title,
        applications.link,
        applications.company_id AS companyId,
        COALESCE(
          json_agg(
            json_build_object(
              'id', notes.id,
              'noteText', notes.note_text,
              'applicationId', notes.application_id
            )
          ) FILTER (WHERE notes.id IS NOT NULL),
          '[]'
        ) AS notes
      FROM applications
      LEFT JOIN notes ON applications.id = notes.application_id
      GROUP BY applications.id;
    `);
  }

  async getApplication(id: number): Promise<Application> {
    const application = await db.oneOrNone(`
      SELECT * FROM applications WHERE id = $1
    `, [id]);

    if (application) {
      application.notes = await db.any(`
        SELECT * FROM notes WHERE application_id = $1
      `, [id]);
    }

    return application;
  }
}
