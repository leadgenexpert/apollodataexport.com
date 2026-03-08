import requests
import sys
from datetime import datetime
import json

class ApolloScrapingAPITester:
    def __init__(self):
        self.base_url = "https://b2b-hunter.preview.emergentagent.com/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            status = "✅ PASS"
        else:
            status = "❌ FAIL"
        
        result = {
            "test": name,
            "status": status,
            "success": success,
            "details": details
        }
        self.test_results.append(result)
        print(f"{status} - {name}")
        if details:
            print(f"    Details: {details}")

    def test_api_root(self):
        """Test API root endpoint"""
        try:
            response = requests.get(f"{self.base_url}/")
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                data = response.json()
                details += f", Response: {data}"
            self.log_test("API Root Endpoint", success, details)
            return success
        except Exception as e:
            self.log_test("API Root Endpoint", False, f"Error: {str(e)}")
            return False

    def test_create_lead_valid(self):
        """Test creating lead with valid data"""
        try:
            payload = {
                "name": "John Doe",
                "email": "john@example.com",
                "company": "Test Company",
                "apollo_url": "https://apollo.io/test-filter"
            }
            
            response = requests.post(
                f"{self.base_url}/leads",
                json=payload,
                headers={"Content-Type": "application/json"}
            )
            
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                data = response.json()
                # Validate response structure
                required_fields = ["id", "name", "email", "created_at", "status"]
                missing_fields = [field for field in required_fields if field not in data]
                
                if missing_fields:
                    success = False
                    details += f", Missing fields: {missing_fields}"
                else:
                    details += f", Lead ID: {data['id']}"
                    # Store the lead ID for future tests
                    self.test_lead_id = data['id']
            else:
                try:
                    error_data = response.json()
                    details += f", Error: {error_data}"
                except:
                    details += f", Response text: {response.text}"
            
            self.log_test("Create Lead (Valid Data)", success, details)
            return success
            
        except Exception as e:
            self.log_test("Create Lead (Valid Data)", False, f"Error: {str(e)}")
            return False

    def test_create_lead_missing_required_fields(self):
        """Test creating lead with missing required fields"""
        try:
            # Test missing name
            payload = {
                "email": "test@example.com"
            }
            
            response = requests.post(
                f"{self.base_url}/leads",
                json=payload,
                headers={"Content-Type": "application/json"}
            )
            
            # Should return 422 for validation error
            success = response.status_code == 422
            details = f"Status: {response.status_code} (expected 422 for missing name)"
            
            if not success:
                try:
                    error_data = response.json()
                    details += f", Response: {error_data}"
                except:
                    details += f", Response text: {response.text}"
            
            self.log_test("Create Lead (Missing Name)", success, details)
            return success
            
        except Exception as e:
            self.log_test("Create Lead (Missing Name)", False, f"Error: {str(e)}")
            return False

    def test_create_lead_invalid_email(self):
        """Test creating lead with invalid email"""
        try:
            payload = {
                "name": "Test User",
                "email": "invalid-email"
            }
            
            response = requests.post(
                f"{self.base_url}/leads",
                json=payload,
                headers={"Content-Type": "application/json"}
            )
            
            # Should return 422 for validation error
            success = response.status_code == 422
            details = f"Status: {response.status_code} (expected 422 for invalid email)"
            
            if not success:
                try:
                    error_data = response.json()
                    details += f", Response: {error_data}"
                except:
                    details += f", Response text: {response.text}"
            
            self.log_test("Create Lead (Invalid Email)", success, details)
            return success
            
        except Exception as e:
            self.log_test("Create Lead (Invalid Email)", False, f"Error: {str(e)}")
            return False

    def test_get_leads(self):
        """Test getting all leads"""
        try:
            response = requests.get(f"{self.base_url}/leads")
            
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                data = response.json()
                details += f", Total leads: {len(data)}"
                
                # Validate response is a list
                if not isinstance(data, list):
                    success = False
                    details += ", Response is not a list"
                elif len(data) > 0:
                    # Check first lead structure
                    first_lead = data[0]
                    required_fields = ["id", "name", "email", "created_at", "status"]
                    missing_fields = [field for field in required_fields if field not in first_lead]
                    
                    if missing_fields:
                        success = False
                        details += f", Missing fields in response: {missing_fields}"
            else:
                try:
                    error_data = response.json()
                    details += f", Error: {error_data}"
                except:
                    details += f", Response text: {response.text}"
            
            self.log_test("Get All Leads", success, details)
            return success
            
        except Exception as e:
            self.log_test("Get All Leads", False, f"Error: {str(e)}")
            return False

    def test_create_minimal_lead(self):
        """Test creating lead with only required fields"""
        try:
            payload = {
                "name": "Jane Smith",
                "email": "jane@example.com"
            }
            
            response = requests.post(
                f"{self.base_url}/leads",
                json=payload,
                headers={"Content-Type": "application/json"}
            )
            
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                data = response.json()
                details += f", Lead ID: {data['id']}"
                
                # Verify optional fields are handled correctly
                if data.get('company') is not None:
                    details += f", Company: {data['company']}"
                if data.get('apollo_url') is not None:
                    details += f", Apollo URL: {data['apollo_url']}"
            else:
                try:
                    error_data = response.json()
                    details += f", Error: {error_data}"
                except:
                    details += f", Response text: {response.text}"
            
            self.log_test("Create Lead (Minimal Data)", success, details)
            return success
            
        except Exception as e:
            self.log_test("Create Lead (Minimal Data)", False, f"Error: {str(e)}")
            return False

    def test_cors_headers(self):
        """Test CORS headers are present"""
        try:
            # Make an OPTIONS request to check CORS
            response = requests.options(f"{self.base_url}/leads")
            
            # Check if CORS headers are present
            cors_headers = [
                'access-control-allow-origin',
                'access-control-allow-methods',
                'access-control-allow-headers'
            ]
            
            present_headers = []
            for header in cors_headers:
                if header in [h.lower() for h in response.headers.keys()]:
                    present_headers.append(header)
            
            success = len(present_headers) > 0
            details = f"Status: {response.status_code}, CORS headers: {present_headers}"
            
            self.log_test("CORS Headers Check", success, details)
            return success
            
        except Exception as e:
            self.log_test("CORS Headers Check", False, f"Error: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all tests"""
        print("🔍 Starting Apollo Scraping API Tests...")
        print("=" * 50)
        
        # Test basic connectivity
        self.test_api_root()
        
        # Test lead creation with various scenarios
        self.test_create_lead_valid()
        self.test_create_lead_missing_required_fields()
        self.test_create_lead_invalid_email()
        self.test_create_minimal_lead()
        
        # Test lead retrieval
        self.test_get_leads()
        
        # Test CORS
        self.test_cors_headers()
        
        print("\n" + "=" * 50)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return 0
        else:
            print("⚠️  Some tests failed")
            return 1

    def get_detailed_results(self):
        """Get detailed test results"""
        return {
            "total_tests": self.tests_run,
            "passed_tests": self.tests_passed,
            "failed_tests": self.tests_run - self.tests_passed,
            "success_rate": (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0,
            "results": self.test_results
        }

def main():
    tester = ApolloScrapingAPITester()
    exit_code = tester.run_all_tests()
    
    # Save detailed results
    results = tester.get_detailed_results()
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump(results, f, indent=2)
    
    return exit_code

if __name__ == "__main__":
    sys.exit(main())