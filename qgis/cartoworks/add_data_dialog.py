# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'add_data_dialog_base.ui'
#
# Created by: PyQt5 UI code generator 5.9.2
#
# WARNING! All changes made in this file will be lost!

from PyQt5 import QtCore, QtGui, QtWidgets
from qgis.PyQt.QtCore import QSettings, QTranslator, QCoreApplication
from qgis.PyQt.QtGui import QIcon
from qgis.PyQt.QtWidgets import QAction, QFileDialog
import os.path, glob
from qgis.core import QgsProject
from qgis.utils import iface
import os

class Ui_addDataDialogBase(object):
    def setupUi(self, addDataDialogBase):
        addDataDialogBase.setObjectName("addDataDialogBase")
        addDataDialogBase.resize(486, 286)
        self.button_box = QtWidgets.QDialogButtonBox(addDataDialogBase)
        self.button_box.setGeometry(QtCore.QRect(20, 241, 441, 31))
        self.button_box.setOrientation(QtCore.Qt.Horizontal)
        self.button_box.setStandardButtons(QtWidgets.QDialogButtonBox.Cancel|QtWidgets.QDialogButtonBox.Ok)
        self.button_box.setObjectName("button_box")
        self.label = QtWidgets.QLabel(addDataDialogBase)
        self.label.setGeometry(QtCore.QRect(40, 124, 81, 20))
        font = QtGui.QFont()
        font.setPointSize(14)
        self.label.setFont(font)
        self.label.setObjectName("label")
        self.lineEdit = QtWidgets.QLineEdit(addDataDialogBase)
        self.lineEdit.setGeometry(QtCore.QRect(130, 120, 251, 28))
        self.lineEdit.setObjectName("lineEdit")
        self.pushButton = QtWidgets.QPushButton(addDataDialogBase)
        self.pushButton.setGeometry(QtCore.QRect(380, 118, 80, 35))
        self.pushButton.setObjectName("pushButton")
        self.lineEdit_2 = QtWidgets.QLineEdit(addDataDialogBase)
        self.lineEdit_2.setGeometry(QtCore.QRect(130, 60, 251, 28))
        self.lineEdit_2.setObjectName("lineEdit_2")
        self.label_2 = QtWidgets.QLabel(addDataDialogBase)
        self.label_2.setGeometry(QtCore.QRect(40, 60, 81, 20))
        font = QtGui.QFont()
        font.setPointSize(14)
        self.label_2.setFont(font)
        self.label_2.setObjectName("label_2")

        self.retranslateUi(addDataDialogBase)
        self.button_box.accepted.connect(self.show_layers)
#        self.button_box.accepted.connect(self.create_folder)
        self.button_box.accepted.connect(addDataDialogBase.accept)
        self.button_box.rejected.connect(addDataDialogBase.reject)
        QtCore.QMetaObject.connectSlotsByName(addDataDialogBase)
        self.pushButton.clicked.connect(self.select_input_file)

        envi_path=os.environ['HOME']

        self.lineEdit.setText(envi_path)

    def select_input_file(self):

        filename = QFileDialog.getExistingDirectory()
        filepath=filename+"/"
        self.lineEdit.setText(filepath)




    # method for creating folder with a user enter order ID as a name.

    def create_folder(self):
        folder_name=self.lineEdit_2.text()
        directory="/Users/navjoth/Documents/SITERECON_DATA_DIR/Order_"+folder_name+"/"
        try:
            if not os.path.exists(directory):
                os.makedirs(directory)
        except OSError:
            directory="/Users/navjoth/Documents/SITERECON_DATA_DIR/Order_"+folder_name+"/"


        self.lineEdit.setText(directory)

    #method for showing all layers inside a folder

    def show_layers(self):

        self.create_folder()
        fileName1 = self.lineEdit.text()

        layers=[]
        for file in glob.glob(fileName1+"*"):

            uri = file
            lyr=uri[-4:]
            lyr1=uri[-8:]
            if(lyr==".shp" or lyr1==".geojson"):
                vlayer =iface.addVectorLayer(uri, os.path.basename(file), "ogr")
                layers.append(vlayer)
            elif(lyr==".tif" or lyr==".img" or lyr==".jpg"):
                vlayer=iface.addRasterLayer(uri,"raster_file")
                layers.append(vlayer)

            else:
                continue

    def retranslateUi(self, addDataDialogBase):
        _translate = QtCore.QCoreApplication.translate
        addDataDialogBase.setWindowTitle(_translate("addDataDialogBase", "adddata"))
        self.label.setText(_translate("addDataDialogBase", "Folder Path"))
        self.pushButton.setText(_translate("addDataDialogBase", "Browse"))
        self.label_2.setText(_translate("addDataDialogBase", "Order ID"))


if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    addDataDialogBase = QtWidgets.QDialog()
    ui = Ui_addDataDialogBase()
    ui.setupUi(addDataDialogBase)
    addDataDialogBase.show()
    sys.exit(app.exec_())

