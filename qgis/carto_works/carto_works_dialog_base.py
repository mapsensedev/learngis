# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'carto_works_dialog_base.ui'
#
# Created by: PyQt5 UI code generator 5.9.2
#
# WARNING! All changes made in this file will be lost!

from PyQt5 import QtCore, QtGui, QtWidgets

class Ui_cartoWorksDialogBase(object):
    def setupUi(self, cartoWorksDialogBase):
        cartoWorksDialogBase.setObjectName("cartoWorksDialogBase")
        cartoWorksDialogBase.resize(400, 300)
        self.button_box = QtWidgets.QDialogButtonBox(cartoWorksDialogBase)
        self.button_box.setGeometry(QtCore.QRect(30, 240, 341, 32))
        self.button_box.setOrientation(QtCore.Qt.Horizontal)
        self.button_box.setStandardButtons(QtWidgets.QDialogButtonBox.Cancel|QtWidgets.QDialogButtonBox.Ok)
        self.button_box.setObjectName("button_box")
        self.label = QtWidgets.QLabel(cartoWorksDialogBase)
        self.label.setGeometry(QtCore.QRect(50, 70, 71, 16))
        self.label.setObjectName("label")
        self.label_2 = QtWidgets.QLabel(cartoWorksDialogBase)
        self.label_2.setGeometry(QtCore.QRect(50, 110, 71, 16))
        self.label_2.setObjectName("label_2")
        self.username_field = QtWidgets.QLineEdit(cartoWorksDialogBase)
        self.username_field.setGeometry(QtCore.QRect(150, 70, 201, 21))
        self.username_field.setObjectName("username_field")
        self.password_field = QtWidgets.QLineEdit(cartoWorksDialogBase)
        self.password_field.setGeometry(QtCore.QRect(150, 110, 201, 21))
        self.password_field.setObjectName("password_field")

        self.retranslateUi(cartoWorksDialogBase)
        self.button_box.accepted.connect(cartoWorksDialogBase.accept)
        self.button_box.rejected.connect(cartoWorksDialogBase.reject)
        QtCore.QMetaObject.connectSlotsByName(cartoWorksDialogBase)

    def retranslateUi(self, cartoWorksDialogBase):
        _translate = QtCore.QCoreApplication.translate
        cartoWorksDialogBase.setWindowTitle(_translate("cartoWorksDialogBase", "Cartoworks"))
        self.label.setText(_translate("cartoWorksDialogBase", "Username"))
        self.label_2.setText(_translate("cartoWorksDialogBase", "Password"))


if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    cartoWorksDialogBase = QtWidgets.QDialog()
    ui = Ui_cartoWorksDialogBase()
    ui.setupUi(cartoWorksDialogBase)
    cartoWorksDialogBase.show()
    sys.exit(app.exec_())

