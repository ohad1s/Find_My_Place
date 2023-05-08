import time
import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select


class PythonOrgSearch(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome(r"C:\Users\dvir1\webdriver\chromedriver")

    # @unittest.skip("")
    def test_index(self):
        driver = self.driver
        driver.get("http://findmyplace.online/")
        self.assertIn("Find My Place", driver.title)
        select_element = driver.find_element(By.ID, "selectOption")
        options = select_element.find_elements(By.TAG_NAME, "option")
        self.assertEqual(len(options), 5)
        select_element = driver.find_element(By.ID, "selectOption")
        select = Select(select_element)
        select.select_by_value("f2")
        # verify that "Floor 2" option is selected
        selected_option = select.first_selected_option
        self.assertEqual(selected_option.text, "Floor 2")
        self.assertEqual(selected_option.get_attribute("value"), "f2")

    # @unittest.skip("")
    def test_floor(self):
        driver = self.driver
        floors = {"f1": "Floor 1", "f2": "Floor 2", "f3": "Floor 3", "f4": "Floor 4"}
        for floor in floors.keys():
            driver.get("http://findmyplace.online/")
            select_element = driver.find_element(By.ID, "selectOption")
            select = Select(select_element)
            select.select_by_value(floor)
            selected_option = select.first_selected_option
            select_element = driver.find_element(By.TAG_NAME, "button")
            select_element.click()
            self.assertIn(floors[floor], driver.title)

    # @unittest.skip("")
    def test_extend(self):
        driver = self.driver
        driver.get("http://findmyplace.online/extend.html")
        self.assertIn("Extend", driver.title)
        no_button = driver.find_element(By.ID, "no-button")
        assert no_button.is_displayed() and no_button.is_enabled()
        enter_button = driver.find_element(By.ID, "enter-button")
        assert enter_button.is_displayed() and enter_button.is_enabled()
        time_input = driver.find_element(By.ID, "time_to_add")
        time_input.send_keys("01:30")
        time_input.send_keys(Keys.RETURN)
        input_field = driver.find_element(By.ID, "input-container2")
        assert input_field.is_displayed()

    # @unittest.skip("")
    def test_submit(self):
        driver = self.driver
        driver.get("http://findmyplace.online/submit.html")
        self.assertIn("Submit", driver.title)
        id_field = self.driver.find_element(By.ID, "ID")
        email_field = self.driver.find_element(By.ID, "email")
        time_field = self.driver.find_element(By.ID, "time")
        submit_button = self.driver.find_element(By.ID, "submit-button")
        assert id_field.is_displayed() and email_field.is_displayed() and time_field.is_displayed() and submit_button.is_enabled()
        # Leave all fields blank
        submit_button.click()
        try:
            alert = driver.switch_to.alert
            # If the above line executes without an exception, it means that an alert is present
            self.assertTrue(True)
            alert.dismiss()
        except:
            self.assertFalse(True, "Alert is not present")  # Assertion to fail the test

    def tearDown(self):
        self.driver.close()


if __name__ == "__main__":
    unittest.main()
