import { Raw } from 'knex';
import BaseDatabase from './BaseDatabase';

export class ShowDatabase extends BaseDatabase {
  private static TABLE_NAME = 'shows_lama';

  public async getShowByDate( weekDay: string, startTime: number, endTime: number): Promise<any> {
    const show = await BaseDatabase.connection.raw(
      `SELECT * FROM ${ShowDatabase.TABLE_NAME} WHERE week_day = "${weekDay}" AND start_time BETWEEN ${startTime} AND ${endTime}`
    )
    return show[0]
  }

  public async getShowByDay(day: string): Promise<any> {
      const show = await BaseDatabase.connection
      .select("*").from(ShowDatabase.TABLE_NAME)
      .where('week_day', day)
      .orderBy("start_time", "ASC")
      
      return show
  }

  public async createShow(
    id: string,
    weekDay: string,
    startTime: number,
    endTime: number,
    bandId: string,
  ): Promise<void> {
    try {
      await BaseDatabase.connection()
        .insert({
          id,
          week_day: weekDay,
          start_time: startTime,
          end_time: endTime,
          band_id: bandId,
        })
        .into(ShowDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}