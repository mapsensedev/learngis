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

class Ui_addDataDialogBase(object):
    def setupUi(self, addDataDialogBase):
        addDataDialogBase.setObjectName("addDataDialogBase")
        addDataDialogBase.resize(400, 300)
        self.button_box = QtWidgets.QDialogButtonBox(addDataDialogBase)
        self.button_box.setGeometry(QtCore.QRect(30, 240, 341, 32))
        self.button_box.setOrientation(QtCore.Qt.Horizontal)
        self.button_box.setStandardButtons(QtWidgets.QDialogButtonBox.Cancel|QtWidgets.QDialogButtonBox.Ok)
        self.button_box.setObjectName("button_box")
        self.label = QtWidgets.QLabel(addDataDialogBase)
        self.label.setGeometry(QtCore.QRect(20, 80, 59, 16))
        self.label.setObjectName("label")
        self.lineEdit = QtWidgets.QLineEdit(addDataDialogBase)
        self.lineEdit.setGeometry(QtCore.QRect(90, 80, 251, 21))
        self.lineEdit.setObjectName("lineEdit")
        self.pushButton = QtWidgets.QPushButton(addDataDialogBase)
        self.pushButton.setGeometry(QtCore.QRect(340, 80, 51, 32))
        self.pushButton.setObjectName("pushButton")

        self.retranslateUi(addDataDialogBase)
        self.button_box.accepted.connect(addDataDialogBase.accept)
        self.button_box.accepted.connect(self.show_layers)

        self.button_box.rejected.connect(addDataDialogBase.reject)
        QtCore.QMetaObject.connectSlotsByName(addDataDialogBase)
        self.pushButton.clicked.connect(self.select_input_file)

    def select_input_file(self):
        filename, _filter = QFileDialog.getSaveFileName(
          None, "Select   input file ","*.")
        filepath=filename[:-2]
        self.lineEdit.setText(filepath)
    def show_layers(self):
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
        self.label.setText(_translate("addDataDialogBase", "add data"))
        self.pushButton.setText(_translate("addDataDialogBase", "..."))


if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    addDataDialogBase = QtWidgets.QDialog()
    ui = Ui_addDataDialogBase()
    ui.setupUi(addDataDialogBase)
    addDataDialogBase.show()
    sys.exit(app.exec_())

