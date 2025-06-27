require "test_helper"

class Api::V1::Hl7DataControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get api_v1_hl7_data_create_url
    assert_response :success
  end
end
