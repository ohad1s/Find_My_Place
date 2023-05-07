import time
import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select


class PythonOrgSearch(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome(r"C:\Users\dvir1\webdriver\chromedriver")

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

    def test_submit(self):
        driver = self.driver
        driver.get("http://findmyplace.online/floors/f1_page.html")
        self.assertIn("Floor 1", driver.title)
        driver.get("http://findmyplace.online/floors/f2_page.html")
        self.assertIn("Floor 2", driver.title)
        driver.get("http://findmyplace.online/floors/f3_page.html")
        self.assertIn("Floor 3", driver.title)
        driver.get("http://findmyplace.online/floors/f4_page.html")
        self.assertIn("Floor 4", driver.title)

    def tearDown(self):
        self.driver.close()


if __name__ == "__main__":
    unittest.main()
