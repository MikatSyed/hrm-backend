import { z } from "zod";

const createAttendanceSchema = z.object({
    body: z.object({
    date: z.string({
        required_error: 'date is required',
      }),
      arrival: z.string({
        required_error: 'arrival time is required',
      }),
      departure: z.string({
        required_error: 'departure time is required',
      }),
     
    })
  });
const updateAttendanceSchema = z.object({
    body: z.object({
    date: z.string({
        required_error: 'date is required',
      }).optional(),
      arrival: z.string({
        required_error: 'arrival time is required',
      }).optional(),
      departure: z.string({
        required_error: 'departure time is required',
      }).optional(),
    
    })
  });

  export const AttendanceValidation = {
    createAttendanceSchema,
    updateAttendanceSchema,
  };
  