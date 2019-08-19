from glob import glob
import setuptools

setuptools.setup(
    name="JupyterHubProxyAPI",
    version='0.0.0',
    url="https://github.com/ktaletsk/JupyterHubProxyAPI",
    author="Konstantin Taletskiy",
    description="A Jupyter notebook API extension to proxy JupyterHub API",
    packages=setuptools.find_packages(),
    install_requires=[
        'notebook',
    ],
    zip_safe=False,
    include_package_data=True
)