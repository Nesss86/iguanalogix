class AppointmentsController < ApplicationController
  before_action :set_appointment, only: %i[show update destroy]

  # GET /appointments
  def index
    @appointments = Appointment.all
    render json: @appointments
  end

  # GET /appointments/1
  def show
    render json: @appointment
  end

  # POST /appointments
  def create
    parsed_time = parse_local_time(params[:appointment][:appointment_time])
    @appointment = Appointment.new(appointment_params.merge(appointment_time: parsed_time))

    if @appointment.save
      render json: @appointment, status: :created, location: @appointment
    else
      render json: @appointment.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /appointments/1
  def update
    parsed_time = parse_local_time(params[:appointment][:appointment_time])
    if @appointment.update(appointment_params.merge(appointment_time: parsed_time))
      render json: @appointment
    else
      render json: @appointment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /appointments/1
  def destroy
    @appointment.destroy!
  end

  private

    # Use callbacks to share common setup or constraints between actions.
    def set_appointment
      @appointment = Appointment.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def appointment_params
      params.require(:appointment).permit(:patient_name, :department, :appointment_time)
    end

    # Parse datetime string as local (Eastern) time
    def parse_local_time(datetime_str)
      Time.zone.parse(datetime_str)
    end
end

